<?php

namespace FediBundle\Controller;

use FediBundle\Entity\ElearningSession;
use FediBundle\Entity\Formation;
use FediBundle\Entity\Level;
use FediBundle\Form\FormationType;
use FediBundle\Repository\FormationRepository;
use http\Env\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use  FediBundle\Entity\User;

class FormationController extends AbstractController
{


    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $formation = $em->getRepository('FediBundle:Formation')->findAll();
        return $this->render('@Fedi/Formation/index.html.twig',array('formations'=>$formation));

    }
    /**
     *@Method({"GET", "POST"})
     *  
     */

    public function newFormationAction(Request $request)
    {
        $formation = new Formation();
        $form = $this->createForm(FormationType::class, $formation);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $ef = $this->getDoctrine()->getManager();

           $formation->setUser($this->getUser());

            $date=new \DateTime();
            $formation->setCreatedAt($date);
            $formation->setEnabled(1);
            $ef->persist($formation);
            $ef->flush();
            $this->addFlash('success', 'Ajout effectuée avec succées');
            return $this->redirectToRoute('fedi_Formationpage');
        }
        return $this->render('@Fedi/Formation/new.html.twig', [
            'formation' => $formation,
            'form' => $form->createView(),
        ]);
    }


    public function editAction(Request $request, Formation $formation)
    {
        $form = $this->createForm(FormationType::class, $formation);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($formation);
            $em->flush();
            return $this->redirectToRoute('fedi_Formationpage', [
            'id' => $formation->getId(),]);
        }
        return $this->render('@Fedi/Formation/edit.html.twig', array('formation' => $formation,
                'form' => $form->createView())
        );
    }



    public function statusAction(Formation $formation)
    {
        $formation->setEnabled(!$formation->getEnabled());
        $em = $this->getDoctrine()->getManager();
        $em->flush();
        $this->addFlash('success', 'Changement status effectuée');
        return $this->redirectToRoute('fedi_Formationpage');
    }



    public function deleteAction(Request $request,  Formation $formation)
    {

        $formationDeleteEs = $this->getDoctrine()->getManager()->getRepository(ElearningSession::class)->findBy(
            array('formation' => $formation)
        );

        if ($formationDeleteEs ) {
            $this->addFlash('error', 'Impossible de supprimer cet formation');
        } else {
            $em = $this->getDoctrine()->getManager();
            $em->remove($formation);
            $em->flush();
        }
        return $this->redirectToRoute('fedi_Formationpage');
    }

    public function getallFormationAction()
    {
        $fomation= $this->getDoctrine()->getManager()
            ->getRepository('FediBundle:Formation')
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
        $formatted = $serializer->normalize($fomation);

        return new JsonResponse ($formatted);
    }
}
