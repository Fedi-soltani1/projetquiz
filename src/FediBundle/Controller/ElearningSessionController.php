<?php

namespace FediBundle\Controller;
use FediBundle\Entity\UserElearningSession;
use Doctrine\Common\Collections\ArrayCollection;
use FediBundle\Entity\Level;
use FediBundle\Entity\ElearningSession;
use FediBundle\Repository\ElearningSessionRepository;
use FediBundle\Entity\Medias;
use FediBundle\FediBundle;
use FediBundle\Form\ElearningSessionType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FediBundle\Traits\ServiceTrait;

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

}
