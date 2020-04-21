<?php

namespace FediBundle\Controller;
use FediBundle\Entity\User;
use FediBundle\Entity\UserElearningSession;
use FediBundle\Form\EleveElearningSessionType;
use FediBundle\Entity\ElearningSession;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class EleveFormationController extends Controller
{

    public function ListElevetElearningSessionAction()
    {
        $em = $this->getDoctrine()->getManager();

        $sessions = $em->getRepository(ElearningSession::class)->findAll()

        ;
        return $this->render('@Fedi/EleveFormation/index.html.twig', ['sessions' => $sessions]);
    }

    public function affecteEleveElearningSessionAction(Request $request,ElearningSession $elearningSession = null )
    {
        $em = $this->getDoctrine()->getManager();

        $idSession = (!$elearningSession) ? 0 : $elearningSession->getId();

        $userElearningSession = new UserElearningSession();
        $options = array('user' => $this->getUser()->getId(), 'idSession' => $idSession);
        $form = $this->createForm(EleveElearningSessionType::class, $userElearningSession, [
            'idSession' => $idSession]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $users = $form->get('user')->getData();
            if ($idSession != 0) {
                $session = $em->getRepository(ElearningSession::class)->findOneBy($idSession);
            } else {
                $session = $form->get('elearningSession')->getData();
            };

            foreach ($users as $user) {

                $userElearningSession = new UserElearningSession();
                $userElearningSession->setUser($user);
                $userElearningSession->setElearningSession($session);
                $user->addElearningSession($session);
                $session->addUserElearningSession($userElearningSession);
                $em->persist($userElearningSession);
                $em->flush();

            }

            $this->addFlash('success', 'Affectation effectuée avec succées');
            return $this->redirect($this->generateUrl('listeEleve_formation'));
        }


        return $this->render('@Fedi/EleveFormation/new.html.twig', array('form' => $form->createView()));
    }

    public function getEleveElearningSession(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $idSession = $request->get('idSession');
        $users = $em->getRepository(User::class)->getCandidatsElearningSession($this->getUser(), $idSession);
        return new JsonResponse($users);
    }
}
