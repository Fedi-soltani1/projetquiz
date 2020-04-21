<?php

namespace FediBundle\Controller;

use FediBundle\Entity\Question;
use FediBundle\Entity\User;
use FediBundle\Form\QuestionType;
use FediBundle\Repository\QuestionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class QuestionController extends AbstractController
{


    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();
        $question = $em->getRepository('FediBundle:Question')->findAll();
        return $this->render('@Fedi/Question/index.html.twig',array('questions'=>$question));

    }


    public function newQuestionAction(Request $request )
    {    $em = $this->getDoctrine()->getManager();
        $question = new Question();
        $form = $this->createForm(QuestionType::class, $question
            );
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            $question->setUser($this->getUser());
            $date=new \DateTime();
            $question->setCreatedAt($date);
            $question->setEnabled(1);
            $em->persist($question);
            $em->flush();
            $this->addFlash('success', 'Ajout effectuée avec succées');
            return $this->redirectToRoute('fedi_Questionpage');
        }
        return $this->render(
            '@Fedi/Question/new.html.twig', array(
                'question' => $question,
                'form' => $form->createView()
        )



        );
    }


    public function editAction(Request $request, Question $question)
    {
        $em = $this->getDoctrine()->getManager();
        $form = $this->createForm(QuestionType::class, $question);
        $oldAnswers = new ArrayCollection();
        foreach ($question->getAnswers() as $answer) {
            $oldAnswers->add($answer);
        }
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            foreach ($oldAnswers as $answer) {
                if ($question->getAnswers()->contains($answer) === false) {
                    $em ->remove($answer);
                    $em ->flush();

                }
            }

            $this->addFlash('success', 'Modification effectuée avec succées');
            return $this->redirectToRoute('fedi_Questionpage');
        }
        return $this->render(
            '@Fedi/Question/edit.html.twig',
            [
                'question' => $question,
                'form' => $form->createView(),
            ]
        );
    }


    public function statusQuestionAction(Question $question)
    {
        $question->setEnabled(!$question->getEnabled());

        $this->addFlash('success', 'Status modifiée avec succées');
        return $this->redirectToRoute('fedi_Questionpage');

    }



    public function deleteAction(Request $request)
    {

        $id=$request->get('id');
        $em=$this->getDoctrine()->getManager();
        $m=$em->getRepository('FediBundle:Question')->find($id);
        $em->remove($m);
        $em->flush();

        return $this->redirectToRoute('fedi_Questionpage');
    }
}
