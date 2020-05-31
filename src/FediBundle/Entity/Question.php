<?php

namespace FediBundle\Entity;

use FediBundle\Entity\Answer;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity(repositoryClass="FediBundle\Repository\QuestionRepository")
 */
class Question
{

    const TYPE_SINGLE_CHOICE = 'TYPE_SINGLE_CHOICE';
    const TYPE_MULTIPLE_CHOICE = 'TYPE_MULTIPLE_CHOICE';


    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     */
    private $label;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $type;

    /**
     * @ORM\Column(type="integer")
     */
    private $enabled;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\User", inversedBy="questions" , cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;


    /**
     * @ORM\ManyToOne(targetEntity="FediBundle\Entity\Medias", inversedBy="questions", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=true)
     */
    private $media;

    /**
     * @ORM\OneToMany(targetEntity="FediBundle\Entity\Answer", mappedBy="question", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $answers;

    /**
     * @ORM\ManyToMany(targetEntity="FediBundle\Entity\Formation", inversedBy="questions", cascade={"persist", "remove"})
     */
    private $formations;




    public function __construct()
    {
        $this->setCreatedAt(new \DateTime());
        $this->setEnabled(1);
        $this->answers = new ArrayCollection();
        $this->formations = new ArrayCollection();

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
    public function getLabel()
    {
        return $this->label;
    }

    /**
     * @param mixed $label
     */
    public function setLabel($label)
    {
        $this->label = $label;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
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
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * @param mixed $media
     */
    public function setMedia($media)
    {
        $this->media = $media;
    }

    /**
     *@return  Collection|Answer[]
     */
    public function getAnswers()
    {
        return $this->answers;
    }

    public function addAnswers(Answer $answer)
    {
        if (!$this->answers->contains($answer)) {
            $this->answers[] = $answer;
            $answer->setQuestion($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer)
    {
        if ($this->answers->contains($answer)) {
            $this->answers->removeElement($answer);
            // set the owning side to null (unless already changed)
            if ($answer->getQuestion() === $this) {
                $answer->setQuestion(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Formation[]
     */
    public function getFormations()
    {
        return $this->formations;
    }

    public function addFormation(Formation $formation)
    {
        if (!$this->formations->contains($formation)) {
            $this->formations[] = $formation;
        }

        return $this;
    }
    public function removeFormation(Formation $formation)
    {
        if ($this->formations->contains($formation)) {
            $this->formations->removeElement($formation);
        }

        return $this;
    }







}
