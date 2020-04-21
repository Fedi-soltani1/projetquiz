<?php

namespace FediBundle\Service;

use FediBundle\Entity\Medias;
use FediBundle\Utils\Media;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->parameterBag = $parameterBag;
    }

    public function upload(UploadedFile $file, $entity)
    {

        $filename = md5(uniqid()).'.'.$file->guessExtension();

        if ($entity instanceof Medias) {

            $type = Media::getTypeMedia($filename);

            if ($type == Medias::TYPE_PHOTO) {
                $file->move($this->parameterBag->get('uploads_directory').'/medias/images', $filename);
            } elseif ($type == Medias::TYPE_VIDEO) {
                $file->move($this->parameterBag->get('uploads_directory').'/medias/videos', $filename);
            } else {
                $file->move($this->parameterBag->get('uploads_directory').'/medias/files', $filename);
            }
        }



        return $filename;

    }

}
