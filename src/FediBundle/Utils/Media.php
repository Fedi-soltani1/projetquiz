<?php


namespace FediBundle\Utils;

use SplFileInfo;

class Media
{

    public static function getTypeMedia($fileName)
    {

        $extImage = ['jpg','png','jpeg'];
        $extVideo = ['mp4','avi','mov'];
        $extFile = ['pdf'];


        $info = new SplFileInfo($fileName);
        $extension = $info->getExtension();

        if (in_array($extension, $extVideo)) {
            return 'TYPE_VIDEO';
        } elseif (in_array($extension, $extImage)) {
            return 'TYPE_PHOTO';
        } elseif (in_array($extension, $extFile)) {
            return 'TYPE_FILE';
        } else {
            return false;
        }
    }


}