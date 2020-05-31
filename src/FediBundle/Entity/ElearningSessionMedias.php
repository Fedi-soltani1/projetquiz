<?php

namespace FediBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * elearningSessionMedias
 * @ORM\Table(name="elearningSessionMedias")
 * @ORM\Entity(repositoryClass="FediBundle\Repository\ElearningSessionMediasRepository")
 */
class ElearningSessionMedias
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $ordre;

    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\Medias", inversedBy="elearningSessionMedias")
     */
    private $medias;

    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\ElearningSession", inversedBy="elearningSessionMedias")
     */
    private $elearningsession;

    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getOrdre()
    {
        return $this->ordre;
    }

    /**
     * @param mixed $ordre
     */
    public function setOrdre($ordre)
    {
        $this->ordre = $ordre;
    }

    /**
     * @return mixed
     */
    public function getMedias()
    {
        return $this->medias;
    }


    public function setMedias($medias)
    {
        $this->medias = $medias;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getElearningsession()
    {
        return $this->elearningsession;
    }


    public function setElearningsession($elearningsession)
    {
        $this->elearningsession = $elearningsession;

        return $this;    }





}
