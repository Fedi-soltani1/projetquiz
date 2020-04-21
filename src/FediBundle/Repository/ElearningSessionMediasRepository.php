<?php

namespace FediBundle\Repository;

use FediBundle\Entity\ElearningSessionMedias;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ElearningSessionMedias|null find($id, $lockMode = null, $lockVersion = null)
 * @method ElearningSessionMedias|null findOneBy(array $criteria, array $orderBy = null)
 * @method ElearningSessionMedias[]    findAll()
 * @method ElearningSessionMedias[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ElearningSessionMediasRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ElearningSessionMedias::class);
    }
    public function findAffectedElearningSession()
    {
        return $this->createQueryBuilder('e')
            ->innerJoin('e.userElearningSessions', 'ue')
            ->where('e.id = :id')
            ->setParameter('username')
            ->getQuery()
            ->getResult();
    }
}
