<?php

namespace FediBundle\Form;

use FediBundle\Entity\User;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('civility', ChoiceType::class, array(
                'choices'  => array(
                    'Mr' => 'Mr',
                    'Mrs' => 'Mrs'
                ),
                'multiple' => false,
                'expanded' => true,
                'required' => true,
            ))
            ->add('firstName')
            ->add('lastName')
            ->add('email')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
