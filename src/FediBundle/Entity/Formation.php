<?php

namespace FediBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 *  Formation
 * @ORM\Table(name="formation")
 * @ORM\Entity(repositoryClass="FediBundle\Repository\FormationRepository")
 */
class Formation
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
     * @ORM\Column(type="integer")
     */
    private $score;

    /**
     * @ORM\Column(type="integer")
     */
    private $timer;


    /**
     * @ORM\Column(type="integer")
     */
    private $enabled;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;



    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\User", inversedBy="formations")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**

     * @ORM\ManyToMany(targetEntity="FediBundle\Entity\Question", mappedBy="formations")
     */
    private $questions;

    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\Level", inversedBy="formations")
     * @ORM\JoinColumn(nullable=false)
     */
    private  $level;
    /**
     * @ORM\OneToMany(targetEntity="FediBundle\Entity\ElearningSession", mappedBy="formation")
     */
    private $elearningSessions;
    public  function __construct()
    {
        $this->setCreatedAt(new \DateTime());
        $this->setEnabled(1);
        $this->questions = new ArrayCollection();

        $this->elearningSessions = new ArrayCollection();
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
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param mixed $score
     */
    public function setScore($score)
    {
        $this->score = $score;
    }

    /**
     * @return mixed
     */
    public function getTimer()
    {
        return $this->timer;
    }

    /**
     * @param mixed $timer
     */
    public function setTimer($timer)
    {
        $this->timer = $timer;
    }

    /**
     * @return mixed
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * @param mixed $enabled
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
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
     * @return mixed
     */
    public function getQuestions()
    {
        return $this->questions;
    }
    public function addQuestion(Question $question)
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->addFormation($this);
        }

        return $this;
    }
    public function removeQuestion(Question $question)
    {
        if ($this->questions->contains($question)) {
            $this->questions->removeElement($question);
            $question->removeFormation($this);
        }

        return $this;
    }

    /**
     * @param mixed $questions
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;
    }

    /**
     * @return mixed
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * @param mixed $level
     */
    public function setLevel($level)
    {
        $this->level = $level;
    }

    /**
     * @return ArrayCollection
     */
    public function getElearningSessions()
    {
        return $this->elearningSessions;
    }
    public function addElearningSession(ElearningSession $elearningSession)
{
    if (!$this->elearningSessions->contains($elearningSession)) {
        $this->elearningSessions[] = $elearningSession;
        $elearningSession->setFormation($this);
    }

    return $this;
}

    public function removeElearningSessionq(ElearningSession $elearningSession)
    {
        if ($this->elearningSessions->contains($elearningSession)) {
            $this->elearningSessions->removeElement($elearningSession);
            // set the owning side to null (unless already changed)
            if ($elearningSession->getFormation() === $this) {
                $elearningSession->setFormation(null);
            }
        }

        return $this;
    }


    public function __toString()
    {
        return $this->getName();
    }





}
