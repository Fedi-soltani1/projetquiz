<?php




namespace FediBundle\Controller;

use Doctrine\DBAL\Schema\View;
use FediBundle\Entity\Answer;
use FediBundle\Entity\ElearningSession;
use Doctrine\ORM\Query;
use FediBundle\Entity\Level;
use FediBundle\Entity\Formation;
use FediBundle\Entity\UserElearningSession;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use \Symfony\Component\HttpFoundation\JsonResponse;


class EleveElearningSessionController extends Controller
{
    private $paginator;


   public function listSessionsElAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $level= $em->getRepository(Level::class)->findBy(array('user'=>$this->getUser()));
        $formationsAf = $em->getRepository(UserElearningSession::class)->findBy(array('user' => $this->getUser()));
        $allFormations = $em->getRepository(Formation::class)->findBy(array('user'=>$this->getUser()));
        $pagination = $this->get('knp_paginator')->paginate(
            $formationsAf, /* query NOT result */
            $request->query->getInt('page', 1), /*page number*/
            10/*limit per page*/
        );
        return $this->render('@Fedi/ElevelElearningSesion/list-elearning-session.html.twig',
            array(
                'levels' => $level,
                'allFormations' => $allFormations,
                'formationAfecte' => $pagination,
            ));
    }



    public function FiltreSessionsElearningByLevelAction(Request $request )
    {   $em = $this->getDoctrine()->getManager();
        $idle = $request->request->get('valIdLevel');
        $user=$this->getUser();
        $idCandidatCurrent = $this->getUser();
        $formationByLevl= [];
        $level = null;
        $scoreSessionElearning = [];


        try {
            if ($idle == "0") {
                $sessionsElearning = $em->getRepository(ElearningSession::class)->getEleveAllElearningSession($idCandidatCurrent);

                if ($sessionsElearning != null) {
                    foreach ($sessionsElearning as $item) {

                        $scoreSessionElearning[] = $em->getRepository(UserElearningSession::class)->findOneBy(['elearningSession' => $item['id'], 'user' => $this->getUser()])->getIsvalid();
                    }
                   $qb = $em->getRepository(Formation::class)->createQueryBuilder('f')->leftJoin('f.level. = :level')
                        ->setParameter('level', $this->getUser()->getLevel())->getQuery();
                    $formationByLevl = $qb->getArrayResult(Query::HYDRATE_ARRAY);

                }

            } else {
                $sessionsElearning = $em->getRepository(ElearningSession::class)->findBy(array('level'=>$this->get($idle)));
                if ($sessionsElearning != null) {
                    foreach ($sessionsElearning as $item) {
                        $scoreSessionElearning[] = $em->getRepository(UserElearningSession::class)->findOneBy(['elearningSession' => $item['id'], 'user' => $this->getUser()])->getIsvalid();
                    }
                    $formationByLevl = $em->getRepository(Formation::class)->getFormationbyLevel($idle );
                    $level = $em->getRepository(Level::class)->find($idle)->getName();

                }


            }
            return $this->json([
                'success' => true,
                'sessionsElearning' => $sessionsElearning,
                'formationBylevl' => $formationByLevl,
                'level' => $level,
                'scoreSessionElearning' => $scoreSessionElearning
            ]);

        } catch (\Exception $exception) {
            return $this->json([
                'success' => false,
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
            ]);
        }
    }
    public function FiltreSessionElearningByCategoryAndFormationAction(Request $request)
    {

        $em = $this->getDoctrine()->getManager();
        $idFormation = $request->request->get('valIdFormation');
        $idCandidatCurrent = $this->getUser();
        $scoreSessionElearning= null;
        try {
            $sessionsElearning = $em->getRepository(ElearningSession::class)->getSessionByFormationAndByLevel($idFormation, $idCandidatCurrent);
            if ($sessionsElearning != null){
                foreach ($sessionsElearning as $item) {
                    $scoreSessionElearning[] = $em->getRepository(UserElearningSession::class)->findOneBy(['elearningSession' => $item['id'], 'user' => $this->getUser()])->getScore();
                }
            }

            return $this->json([
                'success' => true,
                'sessionsElearning' => $sessionsElearning,
                'scoreSessionElearning' => $scoreSessionElearning,
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'success' => false,
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
            ]);
        }
    }


    public function quizAction( $idSession)
    {

        $em = $this->getDoctrine()->getManager();
        $formationCurrent = $em->getRepository(UserElearningSession::class)->findOneBy(array(
            'user' => $this->getUser(),
            'elearningSession' => $idSession
        ))->setView(1);

        $sessionCurrent = $em->getRepository(UserElearningSession::class)->findOneBy(array(
            'user' => $this->getUser(),
            'elearningSession' => $idSession
        ))->getElearningSession();


        $infoFormation = $em->getRepository(ElearningSession::class)->find($formationCurrent->getElearningSession()->getId())->getFormation();
        $listQuestions = $em->getRepository(Formation::class)->find($infoFormation->getId())->getQuestions()->getValues();
        $nbrQuestion = count($listQuestions);
        if ($nbrQuestion == 0) {
            return $this->render('@Fedi/ElevelElearningSesion/empty-data-quiz.html.twig');
        } else {
            foreach ($listQuestions as $key => $value) {
                $answersCorrect[] = count(
                    $em->getRepository(Answer::class)->findBy(
                        array(
                            'question' => $value->getId(),
                            'flag' => 1
                        )
                    )
                );
                $answers[] = $em->getRepository(Answer::class)->findBy(
                    array(
                        'question' => $value->getId(),
                    )
                );
            }
            $nbrQuestions = count($listQuestions);
            $em->persist($formationCurrent);
            $em->flush();;

            return $this->render('@Fedi/ElevelElearningSesion/quiz.html.twig',
                array(
                    'sessionCurrent' => $sessionCurrent,
                    'infoFormation' => $infoFormation,
                    'listQuestions' => $listQuestions,
                    'nbrQuestion' => $nbrQuestions,
                    'answers' => $answers,
                    'answersCorrect' => $answersCorrect,
                )
            );
        }
    }

   /* public function CalculeScoreQuiz(Request $request)
    {
        $idSession = $request->request->get('idSessionCurrent');
        $timeQuiz = $request->request->get('timeSave');
        $scoreQuiz = $request->request->get('scoreQuiz');

        try {
            $sessionCurrent = $this->em->getRepository(\App\Entity\UserElearningSession::class)->findOneBy(array(
                'elearningSession' => $idSession,
                'user' => $this->getUser()));

            $sessionCurrent->setScore($scoreQuiz);
            $sessionCurrent->setTime($timeQuiz);
            $sessionCurrent->setPlayAt(new \DateTime('now'));
            $nameSessionCurrent = $sessionCurrent->getElearningSession()->getName();
            $sessionCurrent->setIsValid(true);
            $this->save($sessionCurrent);
            return $this->json([
                'success' => true,
                'nameSessionCurrent' => $nameSessionCurrent
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'success' => false,
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
            ]);
        }
    }*/
}


