<?php
/**
 * Created by PhpStorm.
 * User: Imen
 * Date: 08/11/2019
 * Time: 17:11
 */

namespace FediBundle\Utils;

class andomValueGenerator
{

    /**
     * @param $length
     * @return string
     */
    static  function randomPassword($length)
    {
        $alfa = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
        $pwd = "";
        for($i = 1; $i < $length; $i ++) {
            $pwd .= $alfa[rand(1, strlen($alfa))];
        }
        return $pwd;
    }

}