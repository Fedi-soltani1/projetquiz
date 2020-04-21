<?php

namespace FediBundle\Form;

use Doctrine\ORM\EntityRepository;
use FediBundle\Entity\ElearningSession;
use FediBundle\Entity\User;
use FediBundle\Entity\UserElearningSession;
use FediBundle\Repository\ElearningSessionRepository;
use App\Repository\UserRepository;
use mysql_xdevapi\Session;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class EleveElearningSessionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

       // $level = $options['level'];

        $idSession = $options['idSession'];

        $builder
            ->add(
                'idSession',
                HiddenType::class,
                [
                    'mapped' => false,
                    'data' => $idSession,
                ]
            )
            ->add(
                'elearningSession',
                EntityType::class,
                [
                    'multiple' => false,
                    'placeholder' => 'Sélectionnez session',
                    'class' => ElearningSession::class,
                    'choice_label' =>'name'

            ])





            ->add(
                'user',
                EntityType::class,
                [
                    'multiple' => true,
                    'required' => false,
                    'class' => User::class,


                ]
            );
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(
            [
                'data_class' => UserElearningSession::class,
            ]
        );
        $resolver->setRequired(['idSession']);
    }
}
