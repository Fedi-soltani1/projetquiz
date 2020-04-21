<?php

namespace FediBundle\Traits;


use FediBundle\Service\FileUploader;
use Doctrine\ORM\EntityManagerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;


Trait ServiceTrait
{

    private $em;
    private $eventDispatcher;
    private $paginator;

    private $fileUploader;




    public function __construct(EntityManagerInterface $em,

                                EventDispatcherInterface $eventDispatcher,

                                PaginatorInterface $paginator,

                                FileUploader $fileUploader)

    {
        $this->em = $em;

        $this->eventDispatcher = $eventDispatcher;

        $this->paginator = $paginator;


        $this->fileUploader = $fileUploader;

    }

    public function save($entity){
        $this->em->persist($entity);
        $this->em->flush();
    }

    public function update(){
        $this->em->flush();
    }

    public function remove($entity){
        $this->em->remove($entity);
        $this->em->flush();
    }


}