<?php

namespace FediBundle\Repository;

use FediBundle\Entity\UserElearningSession;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\NonUniqueResultException;
use phpDocumentor\Reflection\Types\Null_;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method UserElearningSession|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserElearningSession|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserElearningSession[]    findAll()
 * @method UserElearningSession[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserElearningSessionRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, UserElearningSession::class);
    }


    /**
     * @param $session_id
     * @param $user_id
     * @return mixed
     * @throws NonUniqueResultException
     */
    public function checkUserSession($session_id, $user_id)
    {
        return $this->createQueryBuilder('a')
            ->where('a.elearningSession = :session_id')
            ->andWhere('a.user = :user_id')
            ->setParameters(['session_id' => $session_id, 'user_id' => $user_id])
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getCondidatSessionElearningPlayed($idCondidatCurrent){
        return $this->createQueryBuilder('ues')
            ->leftJoin('ues.elearningSession', 'es')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('ues.user', 'u')
            ->Where('u.id = :id')
            ->andWhere('ues.score IS NOT NULL')
            ->setParameter('id', $idCondidatCurrent)
            ->getQuery()
            ->getResult();
    }

    public function getCondidatSessionElearningNoPlayed($idCondidatCurrent){
        return $this->createQueryBuilder('ues')
            ->leftJoin('ues.elearningSession', 'es')
            ->leftJoin('es.formation', 'f')
            ->leftJoin('ues.user', 'u')
            ->Where('u.id = :id')
            ->andWhere('ues.score IS  NULL')
            ->setParameter('id', $idCondidatCurrent)
            ->getQuery()
            ->getResult();
    }
  /*  public function findAllPagination($limit = null,$start = null,$order = null,$by = null,$country=null)
    {
        $res = 'p.'.$order;
        $qb = $this->createQueryBuilder('p')
        ->leftJoin('p.elearningSession', 'es')
        ->where('es.country = :country')
        ->andWhere('p.isvalid IS NOT NULL')
        ->setParameter('country', $country);

        if ($order != null)
        {
            $qb->orderBy($res,$by);
        };

        if ($limit != null)
        {
            $qb->setMaxResults($limit);
        }
        if ($limit != null)
        {
            $qb->setFirstResult($start);
        }

    $query = $qb->getQuery();

    return $query->execute();


}
    public function getResQuizElearningNoPlayedFormation($fromation,$level){
        $qb = $this->createQueryBuilder('p')
            ->leftJoin('p.elearningSession', 'es')
            ->where('es.formation = :formation')
            ->andwhere('es.country = :country')
            ->andWhere('p.isvalid IS NOT NULL')
            ->setParameter('formation', $fromation)
            ->setParameter('country', $country);
             $query = $qb->getQuery();
            return $query->execute();
    }

    public function getQuizElearningFormation($country){
        $qb = $this->createQueryBuilder('p')
            ->leftJoin('p.elearningSession', 'es')
            ->where('es.country = :country')
            ->andWhere('p.isvalid IS NOT NULL')
            ->groupBy('es.formation')
            ->setParameter('country', $country);
        $query = $qb->getQuery();
        return $query->execute();
    }
*/
}
