<?php

namespace FediBundle\Form;

use FediBundle\Entity\ElearningSession;
use FediBundle\Entity\Level;
use FediBundle\Entity\Formation;
use FediBundle\Form\ElearningSessionMediasType;
use FediBundle\Repository\LevelRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ElearningSessionType extends AbstractType
{



    public function buildForm(FormBuilderInterface $builder, array $options)
    {
//        die(var_dump($options['level']));
       $level = $options['level'];


        $builder
            ->add('name', TextType::class);

        if ($level == '') {
            $builder ->add('level', EntityType::class, [
                'required' => true,
                'placeholder' => 'Sélectionnez level',
                'mapped' => false,
                'class' => Level::class,
                'choice_label' => function (Level $level) {
                    return ucfirst($level->getName());
                },

            ]);
        } else {
            $builder ->add('level', EntityType::class, [
                'required' => true,
                'placeholder' => 'Sélectionnez level',
                'mapped' => false,
                'class' => Level::class,
                'choice_label' => function (Level $level) {
                    return ucfirst($level->getName());
                }
                //'query_builder' => function (LevelRepository $repository) use ($level) {
                 //   return $repository->getLevelsByName();
               // },
//                'data' =>$this->em->getReference(Level::class, $level)

            ]);
        }
        $builder    ->add('formation', EntityType::class, [
            'placeholder' => 'Sélectionnez formation',
            'class' => Formation::class,
            'choice_label' => function (Formation $formation) {
                return ucfirst($formation->getName());

            },
        ])

            ->add('elearningSessionMedias', CollectionType::class, array(
                'entry_type' => ElearningSessionMediasType::class,
                'label' => false,
                'entry_options' => array('label' => false, 'required' => true),
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ))
        ;

    }
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ElearningSession::class,
        ]);
        $resolver->setRequired(['level']);
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'fedibundle_elearningsession';
    }


}
