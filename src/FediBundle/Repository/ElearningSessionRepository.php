<?php

namespace FediBundle\Repository;

use FediBundle\Entity\ElearningSession;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ElearningSession|null find($id, $lockMode = null, $lockVersion = null)
 * @method ElearningSession|null findOneBy(array $criteria, array $orderBy = null)
 * @method ElearningSession[]    findAll()
 * @method ElearningSession[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ElearningSessionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ElearningSession::class);
    }


    /**
     * @param $idLev
     * @param $idCandidatCurrent
     * @return array
     */
    public function getCandidatElearningSessionByLevel($idLev, $idCandidatCurrent)
    {
        return $this->createQueryBuilder('es')
            ->leftJoin('es.userElearningSessions', 'ue')
            ->leftJoin('ue.user', 'u')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('f.level', 'c')
            ->Where('u.id = :id')
            ->andWhere('c.id = :cat')
            ->setParameter('lev', $idLev)
            ->setParameter('id', $idCandidatCurrent)
            ->getQuery()
            ->getArrayResult();
    }


    public function getSessionByFormationAndByLevel($idFormation, $idCandidatCurrent)
    {
        $qb = $this->createQueryBuilder('es')
            ->leftJoin('es.userElearningSessions', 'ue')
            ->leftJoin('ue.user', 'u')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('f.level', 'c')
            ->Where('u.id = :id')
            ->andWhere('f.id = :for')
            ->setParameter('for', $idFormation)
            ->setParameter('id', $idCandidatCurrent)
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * @param $idCandidatCurrent
     * @return array
     */
    public function getEleveAllElearningSession($idCandidatCurrent)
    {
        return $this->createQueryBuilder('es')
            ->leftJoin('es.userElearningSessions', 'ue')
            ->leftJoin('ue.user', 'u')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('f.category', 'c')
            ->Where('u.id = :id')
            ->setParameter('id', $idCandidatCurrent)
            ->getQuery()
            ->getArrayResult();

    }


    /**
     * @param $idSession
     * @return array
     */
    public function getCandidatDetailElearningSessionByIdSession($idSession)
    {

        return $this->createQueryBuilder('es')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('es.elearningSessionMedias', 'esm')
            ->leftJoin('esm.medias', 'm')
            ->addSelect('m', 'esm', 'f')
            ->where('es.id = :id')
            ->setParameter('id', $idSession)
            ->getQuery()
            ->getArrayResult();
    }
    /**
    * @param $level
    * @param $idSession
   * @return \Doctrine\ORM\QueryBuilder
   */
    public function getNotAffectedElearningSession ($level, $idSession)
    {
        if ($idSession != 0) {
            // Get elearning session by idsession
            return $this->createQueryBuilder('e')
                ->where('e.id = :idSession')
                ->setParameter('idSession', $idSession);

        } else {
            // Get all affected elearning session
            $req = $this->createQueryBuilder('e')
                ->innerJoin('e.userElearningSessions', 'ue')
                ->where('e.level = :level')
                ->setParameter('level', $level);

            // Get only not affected elearning session
            return $this->createQueryBuilder('e1')
                ->where('e1.level = :level')
                ->andWhere('e1.id NOT IN (' . $req->getDQL() . ')')
                ->setParameter('level', $level);
        }
    }

    /**
     * @param $idEleve
     * @return array
     */
    public function getAffectedElearningSession($idEleve)
    {
        return $this->createQueryBuilder('e')
            ->innerJoin('e.userElearningSessions', 'ue')
            ->where('e.Id = :id')
            ->setParameter('id', $idEleve)
            ->getQuery()
            ->getResult();
    }



}
