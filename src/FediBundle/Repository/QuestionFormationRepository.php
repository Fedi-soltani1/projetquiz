<?php

namespace FediBundle\Repository;

use FediBundle \Entity\QuestionFormation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method QuestionFormation|null find($id, $lockMode = null, $lockVersion = null)
 * @method QuestionFormation|null findOneBy(array $criteria, array $orderBy = null)
 * @method QuestionFormation[]    findAll()
 * @method QuestionFormation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class QuestionFormationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, QuestionFormation::class);
    }


}
