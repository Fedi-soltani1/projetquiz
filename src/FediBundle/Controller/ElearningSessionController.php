<?php

namespace FediBundle\Controller;
use FediBundle\Entity\Formation;
use FediBundle\Entity\UserElearningSession;
use Doctrine\Common\Collections\ArrayCollection;
use FediBundle\Entity\Level;
use FediBundle\Entity\ElearningSession;
use FediBundle\Repository\ElearningSessionRepository;
use FediBundle\Entity\Medias;
use FediBundle\FediBundle;
use FediBundle\Form\ElearningSessionType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FediBundle\Traits\ServiceTrait;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class ElearningSessionController extends Controller
{

    public function newSessionAction(Request $request)
{


    $sessionEle = new ElearningSession();
    $em= $this->getDoctrine()->getManager();
    $medias = $em->getRepository(Medias::class)->findBy(array('choice' => Medias::MEDIA_ELEARNING));
//    $options = array( '' => null);
    $form = $this->createForm(ElearningSessionType::class, $sessionEle, [
        'level' => '',
    ]);
    $form->handleRequest($request);
    if ($form->isSubmitted() && $form->isValid()) {
       $sessionEle->setUser($this->getUser());

        $em->persist($sessionEle);
        $em->flush();
        $this->addFlash('success', 'Ajout effectué avec succés');
        return $this->redirectToRoute('list_Ele');
    }
    return $this->render('@Fedi/ElearningSession/new.html.twig', [
        'sessionEle' => $sessionEle,
        'medias' => $medias,
        'form' => $form->createView(),
    ]);
}
     public function indexAction()
     {
         $em = $this->getDoctrine()->getManager();
         $elearningSession = $em->getRepository(ElearningSession::class)->findAll();

         return $this->render('@Fedi/ElearningSession/list.html.twig',array('elearningSession'=>$elearningSession));
     }

     public function editAction(Request $request, ElearningSession $elearningSession)
     {
         $em= $this->getDoctrine()->getManager();
         $medias = $em->getRepository(Medias::class)->findBy(array('choice' => Medias::MEDIA_ELEARNING));

         $options = array('level' => $elearningSession->getFormation()->getlevel()->getId());
         $form = $this->createForm(ElearningSessionType::class, $elearningSession, $options);
         $originalMedias = new ArrayCollection();
         foreach ($elearningSession->getElearningSessionMedias() as $media) {
             $originalMedias->add($media);
         }
         $form->handleRequest($request);
         if ($form->isSubmitted() && $form->isValid()) {
             foreach ($originalMedias as $media) {
                 if ($elearningSession->getElearningSessionMedias()->contains($media) === false) {
                     $em->remove($media);
                 }
             }

             $em->flush();
             $this->addFlash('success', 'Modification effectué avec succés');
             return $this->redirectToRoute('list_Ele');
         }
         return $this->render('@Fedi/ElearningSession/edit.html.twig', [
             'medias' => $medias,
             'form' => $form->createView(),
         ]);
     }
     public function deleteAction(Request $request , ElearningSession $elearningSession)
     {

         $em = $this->getDoctrine()->getManager();
         $esDelete = $em->getRepository(UserElearningSession::class)->findBy(array('elearningSession' => $elearningSession));
         if ($esDelete) {
             $this->addFlash('error', 'Impossible de supprimer cet session');
         } else {

             $em->remove($elearningSession);
             $em->flush();
             $this->addFlash('success', 'Suppression effectuée avec succées');
         }
         return $this->redirectToRoute('list_Ele');


     }


    public function getSessionByLevel(Request $request)
    {

        $idLev = $request->request->get('valLevel');
        try {
            $em= $this->getDoctrine()->getManager();
            $formation = $em->getRepository(Formation::class)->getFormationByLevel($idLev);
            return $this->json([
                'success' => true,
                'formation' => $formation,
            ]);

        } catch (\Exception $exception) {
            return $this->json([
                'success' => false,
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
            ]);
        }

    }
    public function getallElarningsessionAction()
    {


        $Elearningsession= $this->getDoctrine()->getManager()
            ->getRepository('FediBundle:ElearningSession')
            ->findAll();

        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizer = new ObjectNormalizer();
        $normalizer->setCircularReferenceLimit(2);
        // Add Circular reference handler
        $normalizer->setCircularReferenceHandler(function ($formation) {
            return $formation->getId();
        });
        $normalizers = array($normalizer);
        $serializer = new Serializer($normalizers, $encoders);
        $formatted = $serializer->normalize($Elearningsession);

        return new JsonResponse($formatted);
    }

}
