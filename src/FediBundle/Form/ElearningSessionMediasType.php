<?php

namespace FediBundle\Form;

use Doctrine\ORM\EntityRepository;
use FediBundle\Entity\ElearningSession;
use FediBundle\Entity\Medias;
use FediBundle\Repository\MediasRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ElearningSessionMediasType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('ordre', IntegerType::class, [
                'required' => true,
                'label' => 'Ordre',
                'attr' => [
                    'class' => 'form-control input-sm',
                ],

            ])
            ->add('medias', EntityType::class, [
                'required' => true,
                'label' => 'Médias',
                'expanded' => false,
                'placeholder' => 'select Médias',
                'class' => Medias::class,
                'choice_label'  => function ($media, $type) {
                    if($media->getType()=='TYPE_VIDEO')  $type = 'VIDEO';
                    if($media->getType()=='TYPE_PHOTO') $type = 'PHOTO';
                    if($media->getType()=='TYPE_FILE')  $type = 'FILE';
                    return sprintf('%s (%s)', ucfirst($media->getName()), $type);
                },
                'query_builder' => function (EntityRepository $repository){
                    $qb = $repository->createQueryBuilder('m');
                    return $qb->where('m.type = :type')->setParameter('type', Medias::MEDIA_ELEARNING);
                }
            ])

        ;
    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ElearningSession::class,
        ]);
       // $resolver->setRequired(['media']);

    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'fedibundle_elearningsessionmedias';
    }


}
