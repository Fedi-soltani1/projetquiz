<?php

namespace FediBundle\EventListener;



use FediBundle\Entity\Medias;
use FediBundle\Service\FileUploader;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploadListener
{

    private $uploader;

    public function __construct(FileUploader $uploader)
    {
        $this->uploader = $uploader;
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->uploadFile($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();
        $this->uploadFile($entity);
    }

    private function uploadFile($entity)
    {

        if (!$entity instanceof Medias ) {
            return;
        }

        $file = $entity->getFile();

        if ($file instanceof UploadedFile) {

            $filename = $this->uploader->upload($file, $entity);
            $entity->setFile($filename);
        }



}}