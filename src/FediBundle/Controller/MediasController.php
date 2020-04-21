<?php

namespace FediBundle\Controller;
use FediBundle\Traits\ServiceTrait;
use FediBundle\Entity\Question;
use FediBundle\Entity\User;
use FediBundle\Entity\Medias;
use FediBundle\Utils\Media;
use FediBundle\Form\MediasType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;



class MediasController extends AbstractController
{



    public function newMediaAction(Request $request)
    {

        $media = new Medias();
        $form = $this->createForm(MediasType::class, $media);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
           $media->setUser($this->getUser());
            $em = $this->getDoctrine()->getManager();

            $typeMedia = $media->getChoice();
            $mediasExist = $em->getRepository(Medias::class)->findBy(array('name' => $media->getName()));
            $fileName = $media->getFile()->getClientOriginalName();
            $ext = Media::getTypeMedia($fileName);
            if ($mediasExist) {
                $this->addFlash('error', 'Ce nom existe déja');
            } elseif (!$ext) {
                $this->addFlash('error', "Veuillez vérifier l'extension de média autorisée");
            } else {
                $media->setType($ext);
                $media->setCreatedAt(new \DateTime('now'));
                $em->persist($media);
                $em->flush();
                $this->addFlash('success', 'Ajout effectué avec succés');
                return $this->redirectToRoute('fedi_MediaQuiz');

            }
        }
        return $this->render('@Fedi/Medias/new.html.twig', array(
            'form' => $form->createView(),
        ));

    }


    public function listMediasQuizAction()
    {
        $em = $this->getDoctrine()->getManager();
        $medias = $em->getRepository(Medias::class)->findBy(array('choice' => Medias::MEDIA_QUIZ));
        return $this->render('@Fedi/Medias/list-medias-quiz.html.twig', array('media' => $medias));
    }


    public function listMediasElAction()
    {    $em = $this->getDoctrine()->getManager();
        $medias = $em->getRepository(Medias::class)->findBy(array('choice' => Medias::MEDIA_ELEARNING));
        return $this->render('@Fedi/Medias/list-medias-E-learning.html.twig', array('medias' => $medias));
    }



    public function deleteAction(Request $request)
{
    $id=$request->get('id');
    $em=$this->getDoctrine()->getManager();
    $m=$em->getRepository('FediBundle:Question')->find();
    $em->remove($m);
    $em->flush();

    return $this->redirectToRoute('fedi_MediaQuiz');
}

    public function editAction(Request $request, Medias $medias)
    {
        $em=$this->getDoctrine()->getManager();
        $media = $em->getRepository(Medias::class)->find($medias);
        $file = $media->getFile();
        $type = $media->getType();
        $form = $this->createForm(MediasType::class, $media);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {

            if($media->getFile() == null) {
                $media->setFile($file);
                $media->setType($type);
            } else {

                $fileName = $media->getFile()->getClientOriginalName();
                $ext = Media::getTypeMedia($fileName);
                if (!$ext){
                    $this->addFlash('error', "Veuillez vérifier l'extension de média autorisée");
                }else{
                    $media->setType($ext);
                }

            }

$em=$this->getDoctrine()->getManager();

            $em->persist($media);
            $em->flush();
           $this->addFlash('success', 'Modification effectué avec succés');
return $this->redirectToRoute('fedi_MediaQuiz');
        }

        return $this->render('@Fedi/Medias/edit.html.twig', array(
            'form' => $form->createView(),
        ));

    }
}