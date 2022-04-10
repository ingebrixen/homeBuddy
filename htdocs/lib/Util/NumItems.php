<?php

namespace Util;

class NumItems  
{
        //      zählt die Einträge des jeweiligen Monats und Numeriert die Einzahlungen
        public static function incrItems(array $post):int
        {
                $num = self::getNum($post);

                return ($num + 1);
        }
        private static function getNum(array $post):int
        {
                $aktDate = ["datum" => date('Y-m', strtotime($post['datum']))];

                $model = \App::getResourceModel('DBHandler');
                $num = $model->countItems('haushaltskasse', $aktDate);

                return $num;
        }
}