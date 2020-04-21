<?php

namespace FediBundle\Entity;

use FediBundle\Entity\Formation;
use FediBundle\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class Level
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;


    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="Level")
     * @ORM\JoinColumn(nullable=False)
     */
    private $user;



    /**
     * @ORM\OneToMany(targetEntity="Formation", mappedBy="Level")
     */
    private $formations;



    public function __construct()
    {
        $this->formations = new ArrayCollection();

    }


    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser($user)
    {
        $this->user = $user;

        return $this;
    }





    /**
     * @return Collection|Formation[]
     */
    public function getFormations()
    {
        return $this->formations;
    }

    public function addFormation( $formation)
    {
        if (!$this->formations->contains($formation)) {
            $this->formations[] = $formation;
            $formation->setLevel($this);
        }

        return $this;
    }

    public function removeFormation( $formation)
    {
        if ($this->formations->contains($formation)) {
            $this->formations->removeElement($formation);
            // set the owning side to null (unless already changed)
            if ($formation->getLevel() === $this) {
                $formation->setLevel(null);
            }
        }

        return $this;
    }


}
