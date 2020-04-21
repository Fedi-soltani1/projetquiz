<?php

namespace FediBundle\Form;

use FediBundle\Entity\Formation;
use FediBundle\Entity\Medias;
use FediBundle\Entity\Question;
use FediBundle\Repository\FormationRepository;
use FediBundle\Repository\MediasRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class QuestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('label')
            ->add('type', ChoiceType::class, [
                'choices'  => [
                    'Choix Unique' => 'TYPE_SINGLE_CHOICE ',
                    'Choix Multiple' => 'TYPE_MULTIPLE_CHOICE',
                ],
            ])
            ->add(
                'media',
                EntityType::class,
                [
                    'required'=> false,
                    'placeholder' => 'Sélectionnez média',
                    'class' => Medias::class,
                    'choice_label'  =>'name'

                ]
            )
            ->add('formations',
                EntityType::class,
                [
                    'required'=> true,
                    'multiple' => true,
                    'placeholder' => 'Sélectionnez formations',
                    'class' => Formation::class,
                    'choice_label' => 'name',

                ]
            )

            ->add('answers', CollectionType::class, array(
                'entry_type' => AnswerType::class,
                'label' => false,
                'entry_options' => array('label' => false, 'required' => true),
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                ));


    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Question::class,
        ]);

    }
}
