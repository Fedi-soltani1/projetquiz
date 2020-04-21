<?php


namespace FediBundle\Entity;
use FOS\UserBundle\Model\GroupInterface;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="User")
 */
class User extends BaseUser
{
    const ROLE_ADMIN = 'ROLE_ADMIN';
    const ROLE_ELEVE = 'ROLE_ELEVE';
    const ROLE_PARENT = 'ROLE_PARENT';
    const ROLE_ENSEIGNANT = 'ROLE_ENSEIGNANT';

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;


    /**
     * @ORM\OneToMany(targetEntity="Medias", mappedBy="user")
     */
    private $medias;


    /**
     * @ORM\OneToMany(targetEntity="Level", mappedBy="user")
     */
    private $levels;


    /**
     * @ORM\OneToMany(targetEntity="Formation", mappedBy="user")
     */
    private $formations;


    /**
     * @ORM\Column(type="datetime")
     */
    private $created_at;
    /**
     * @ORM\OneToMany(targetEntity="ElearningSession", mappedBy="user")
     */
    private $elearningSessions;


    /**
     * @ORM\OneToMany(targetEntity="UserElearningSession", mappedBy="user")
     */
    private $userElearningSessions;

    /**
     * @ORM\OneToMany(targetEntity="Question", mappedBy="user")
     */
    private $questions;


    public function __construct()
    {
        parent::__construct();
        $this->setCreatedAt(new \DateTime());
        $this->setLastLogin(new \DateTime());
        $this->setEnabled(1);
        $this->medias = new ArrayCollection();
        $this->levels = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->user = new ArrayCollection();
        $this->elearningSessions = new ArrayCollection();
        $this->userElearningSessions = new ArrayCollection();





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
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param string $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getMedias()
    {
        return $this->medias;
    }

    /**
     * @param mixed $medias
     */
    public function setMedias($medias)
    {
        $this->medias = $medias;
    }

    /**
     * @return mixed
     */
    public function getFormations()
    {
        return $this->formations;
    }


    public function addFormation(Formation $formation)
    {
        if (!$this->formations->contains($formation)) {
            $this->formations[] = $formation;
            $formation->setUser($this);
        }

        return $this;
    }
    public function removeFormation(Formation $formation)
    {
        if ($this->formations->contains($formation)) {
            $this->formations->removeElement($formation);
            // set the owning side to null (unless already changed)
            if ($formation->getUser() === $this) {
                $formation->setUser(null);
            }
        }

        return $this;
    }


    /**
     * @return mixed
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * @param mixed $questions
     */
    public function setQuestions($questions)
    {
        $this->questions = $questions;
    }

    /**
     * @return ArrayCollection
     */
    public function getLevels()
    {
        return $this->levels;
    }


    /* public function addLevel(Level $level)
     {
         if (!$this->levels->contains($level)) {
             $this->$level[] = $level;
             $level->setUser($this);
         }

         return $this;
     }*/
    public function removeLevel(Level $level)
    {
        if ($this->levels->contains($level)) {
            $this->levels->removeElement($level);
            // set the owning side to null (unless already changed)
            if ($level->getUser() === $this) {
                $level->setUser(null);
            }
        }

        return $this;
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
            $elearningSession->setUser($this);
        }

        return $this;
    }
    public function removeElearningSession(ElearningSession $elearningSession)
    {
        if ($this->elearningSessions->contains($elearningSession)) {
            $this->elearningSessions->removeElement($elearningSession);
            // set the owning side to null (unless already changed)
            if ($elearningSession->getUser() === $this) {
                $elearningSession->setUser(null);
            }
        }

        return $this;
    }
    public function addUserElearningSession(UserElearningSession $userElearningSession)
    {
        if (!$this->userElearningSessions->contains($userElearningSession)) {
            $this->userElearningSessions[] = $userElearningSession;
            $userElearningSession->setUser($this);
        }

        return $this;
    }
    public function removeUserElearningSession(UserElearningSession $userElearningSession)
    {
        if ($this->userElearningSessions->contains($userElearningSession)) {
            $this->userElearningSessions->removeElement($userElearningSession);
            // set the owning side to null (unless already changed)
            if ($userElearningSession->getUser() === $this) {
                $userElearningSession->setUser(null);
            }
        }

        return $this;
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
     * @return ArrayCollection
     */
    public function getUserElearningSessions()
    {
        return $this->userElearningSessions;
    }

    /**
     * @param ArrayCollection $userElearningSessions
     */
    public function setUserElearningSessions($userElearningSessions)
    {
        $this->userElearningSessions = $userElearningSessions;
    }

    /**
     * @return mixed
     */
    public function getRoles()
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_CANDIDAT
        if (empty($roles)) {
            $roles[] = 'ROLE_Elevel';
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles)
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param mixed $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * @return string
     */
    public function getUsernameCanonical()
    {
        return $this->usernameCanonical;
    }

    /**
     * @param string $usernameCanonical
     */
    public function setUsernameCanonical($usernameCanonical)
    {
        $this->usernameCanonical = $usernameCanonical;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return string
     */
    public function getEmailCanonical()
    {
        return $this->emailCanonical;
    }

    /**
     * @param string $emailCanonical
     */
    public function setEmailCanonical($emailCanonical)
    {
        $this->emailCanonical = $emailCanonical;
    }

    /**
     * @return string
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @param string $salt
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param string $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return string
     */
    public function getPlainPassword()
    {
        return $this->plainPassword;
    }

    /**
     * @param string $plainPassword
     */
    public function setPlainPassword($plainPassword)
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @return \DateTime|null
     */
    public function getLastLogin()
    {
        return $this->lastLogin;
    }

    public function setLastLogin(\DateTime $time = null)
    {
        $this->lastLogin = $time;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getConfirmationToken()
    {
        return $this->confirmationToken;
    }

    /**
     * @param string|null $confirmationToken
     */
    public function setConfirmationToken($confirmationToken)
    {
        $this->confirmationToken = $confirmationToken;
    }

    /**
     * @return \DateTime|null
     */
    public function getPasswordRequestedAt()
    {
        return $this->passwordRequestedAt;
    }


    public function setPasswordRequestedAt(\DateTime $date = null)
    {
        $this->passwordRequestedAt = $date;

        return $this;
    }

    /**
     * @return Collection|GroupInterface[]
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * @param Collection|GroupInterface[] $groups
     */
    public function setGroups($groups)
    {
        $this->groups = $groups;
    }
}