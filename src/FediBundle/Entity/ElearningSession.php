<?php

namespace FediBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity
 */
class ElearningSession
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
     * @ORM\ManyToOne(targetEntity="Formation", inversedBy="elearningSessions")
     */
    private $formation;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="elearningSessions")
     */
    private $user;


    /**
     * @ORM\OneToMany(targetEntity="ElearningSessionMedias", mappedBy="elearningsession", cascade={"persist","remove"})
     */
    private $elearningSessionMedias;

    /**
     * @ORM\OneToMany(targetEntity="UserElearningSession", mappedBy="elearningSession")
     */
    private $userElearningSessions;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getFormation()
    {
        return $this->formation;
    }

    /**
     * @param mixed $formation
     */
    public function setFormation($formation)
    {
        $this->formation = $formation;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return ArrayCollection
     */
    public function getElearningSessionMedias()
    {
        return $this->elearningSessionMedias;
    }

    /**
     * @param ArrayCollection $elearningSessionMedias
     */
    public function setElearningSessionMedias($elearningSessionMedias)
    {
        $this->elearningSessionMedias = $elearningSessionMedias;
    }



    public function __construct()
    {
        $this->createdAt = new \DateTime('now');
        $this->elearningSessionMedias = new ArrayCollection();
        $this->userElearningSessions = new ArrayCollection();
    }



    public function addElearningSessionMedia(ElearningSessionMedias $elearningSessionMedia)
    {
        if (!$this->elearningSessionMedias->contains($elearningSessionMedia)) {
            $this->elearningSessionMedias[] = $elearningSessionMedia;
            $elearningSessionMedia->setElearningsession($this);
        }

        return $this;
    }

    public function removeElearningSessionMedia(ElearningSessionMedias $elearningSessionMedia)
    {

        if ($this->elearningSessionMedias->contains($elearningSessionMedia)) {
            $this->elearningSessionMedias->removeElement($elearningSessionMedia);
            // set the owning side to null (unless already changed)
            if ($elearningSessionMedia->getElearningsession() === $this) {
                $elearningSessionMedia->setElearningsession(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|UserElearningSession[]
     */
    public function getUserElearningSessions()
    {
        return $this->userElearningSessions;
    }

    public function addUserElearningSession(UserElearningSession $userElearningSession)
    {
        if (!$this->userElearningSessions->contains($userElearningSession)) {
            $this->userElearningSessions[] = $userElearningSession;
            $userElearningSession->setElearningSession($this);
        }

        return $this;
    }

    public function removeUserElearningSession(UserElearningSession $userElearningSession)
    {
        if ($this->userElearningSessions->contains($userElearningSession)) {
            $this->userElearningSessions->removeElement($userElearningSession);
            // set the owning side to null (unless already changed)
            if ($userElearningSession->getElearningSession() === $this) {
                $userElearningSession->setElearningSession(null);
            }
        }

        return $this;
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function __toString()
    {
       return $this->getName();
    }


}
