<?php

namespace FediBundle\Controller;

use FediBundle\Entity\Level;
use FediBundle\Form\LevelType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LevelController extends Controller
{
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $level = $em->getRepository('FediBundle:Level')->findAll();
        return $this->render('@Fedi/Level/index.html.twig',array('level'=>$level));

    }

    public function newLevelAction(Request $request)
    {
        $level = new Level();
        $form = $this->createForm(LevelType::class, $level);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
           $level->setUser($this->getUser());
            $em->persist($level);
            $em->flush();
            return $this->redirectToRoute('fedi_Levelpage');
        }
        return $this->render('@Fedi/Level/new.html.twig', [
            'level' => $level,
            'form' => $form->createView(),
        ]);
    }

    public function editLevelAction(Request $request, Level $level)
    {
        $form = $this->createForm(LevelType::class, $level);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($level);
            $em->flush();
            return $this->redirectToRoute('fedi_Levelpage', [
                'id' => $level->getId(),
            ]);
        }
        return $this->render('@Fedi/Level/edit.html.twig', [
            'level' => $level,
            'form' => $form->createView(),
        ]);
    }
}
