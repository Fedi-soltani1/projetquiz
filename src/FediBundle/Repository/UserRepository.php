<?php

namespace FediBundle\Repository;

use FediBundle\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     *
     * @param $role
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getUsersByRoles( $role)
    {
        return $this->createQueryBuilder('u')
            ->where('u.roles LIKE :roles')
            ->setParameter('roles', '%"'.$role.'"%')
            ;
    }










    /**
     * @param $role
     * @return mixed
     */
    public function findByRole($role)
    {
        return $this->createQueryBuilder('u')
            ->where('u.roles LIKE :roles')
            ->setParameter('roles', '%"'.$role.'"%')
            ->getQuery()
            ->getResult();
    }



    /**
     * @param $email
     * @return bool
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function findUserByEmail($email)
    {
        $check = $this->createQueryBuilder('u')
            ->andWhere('u.email = :email')
            ->setParameter('email', $email)
            ->getQuery()
            ->getOneOrNullResult();

        return ($check == null) ? false : true;
    }

    /**
     * @param $country
     * @param $enabled
     * @param $role
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getFormateurByCountry($country, $enabled, $role)
    {
        return $this->createQueryBuilder('u')
            ->where('u.roles LIKE :roles')
            ->setParameter('roles', '%"'.$role.'"%')
            ->andWhere('u.enabled = :enabled')
            ->setParameter(':enabled', $enabled)
            ->andWhere('u.country = :country')
            ->setParameter('country', $country);

    }

    /**
     * @param $country
     * @param $idElSession
     * @return mixed
     */
    public function getCandidatsElearningSession($country, $idSession)
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.userElearningSessions', 'ue')
            ->where('u.country = :country')
            ->andWhere('ue.elearningSession = :idSession')
            ->setParameters(['country' => $country,'idSession' => $idSession])
            ->getQuery()
            ->getArrayResult();
    }

    /**
     * @param $country
     * @param $idPresSession
     * @return array
     */
    public function getCandidatsPresentielSession($country, $idSession)
    {
        return $this->createQueryBuilder('u')
            ->innerJoin('u.userPresentielSessions', 'up')
            ->where('u.country = :country')
            ->andWhere('up.presentielSession = :idSession')
            ->setParameters(['country' => $country,'idSession' => $idSession])
            ->getQuery()
            ->getArrayResult();
    }


}
