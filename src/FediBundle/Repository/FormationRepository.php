<?php

namespace FediBundle\Repository;

use FediBundle\Entity\Formation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Formation|null find($id, $lockMode = null, $lockVersion = null)
 * @method Formation|null findOneBy(array $criteria, array $orderBy = null)
 * @method Formation[]    findAll()
 * @method Formation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FormationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Formation::class);
    }
    public function getFormationByLevel($idle)
    {
        return $this->createQueryBuilder('f')
            ->Where('f.level = :level')
            ->setParameter('level', $idle)
            ->getQuery()
            ->getArrayResult();
    }

    public function getFormation($Formation_id)
    {
        return $this->createQueryBuilder('f')
            ->Where('f.Fomation = :Formation_id')
            ->setParameter('Formation_id',$Formation_id)
            ->groupBy('f.level')
            ->getQuery()
            ->getResult();

    }


}
