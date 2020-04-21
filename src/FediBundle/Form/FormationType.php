<?php

namespace FediBundle\Form;

use FediBundle\Entity\Formation;
use FediBundle\Entity\Level;
use FediBundle\Repository\FormationRepository;
use FediBundle\Repository\LevelRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FormationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

      // $level= $options['level'];
        $builder
            ->add('name', TextType::class, array('required' => true))
            ->add('score', TextType::class, array('required' => true))

            ->add('timer',TextType::class, array('required' => true))
            ->add(
                'level',
                EntityType::class,
                [
                    'required'=> true,
                    'placeholder' => 'Sélectionner level',
                    'class' => Level::class,
                    'choice_label' => 'name'
                   // 'query_builder' => function (LevelRepository $repository) use ($level) {
                      //  return $repository->getLevelsByName($level);

                ]
            )

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Formation::class,
        ]);
    }
}
