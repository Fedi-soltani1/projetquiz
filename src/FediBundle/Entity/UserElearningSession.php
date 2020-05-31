<?php

namespace FediBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class UserElearningSession
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="userElearningSessions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="ElearningSession", inversedBy="userElearningSessions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $elearningSession;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $view;

    /**
     * @ORM\Column(type="datetime")
     */
    private $affectedAt;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $score;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $time;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $playAt;


    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isvalid;



    public function __construct()
    {
        $this->setAffectedAt(new \DateTime());
        $this->setView(0);
        $this->user = new ArrayCollection();
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


    public function getUser()
    {
        return $this->user;
    }


    public function setUser(User $user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getElearningSession()
    {
        return $this->elearningSession;
    }


    public function setElearningSession($elearningSession)
    {
        $this->elearningSession = $elearningSession;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getView()
    {
        return $this->view;
    }


    public function setView($view)
    {
        $this->view = $view;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAffectedAt()
    {
        return $this->affectedAt;
    }


    public function setAffectedAt($affectedAt)
    {
        $this->affectedAt = $affectedAt;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }


    public function setScore($score)
    {
        $this->score = $score;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTime()
    {
        return $this->time;
    }


    public function setTime($time)
    {
        $this->time = $time;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPlayAt()
    {
        return $this->playAt;
    }



    public function setPlayAt($playAt)
    {
        $this->playAt = $playAt;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIsvalid()
    {
        return $this->isvalid;
    }

    /**
     * @param mixed $isvalid
     */
    public function setIsvalid($isvalid)
    {
        $this->isvalid = $isvalid;
    }
    public function __toString()
    {
        return (string) $this->user;
    }











}
