<?php
/**  (c) Thomas Böhme **/



namespace Util;

class NumItems  
{
        public static function incrItems(array $post)
        {
                switch ($post) {
                        case empty($post['num']) : 
                                # code...
                                break;
                        
                        default:
                                # code...
                                break;
                }
        }
}

#       Cases
#       monat jahr  != aktuellem Jahr-Monat -> num+1
#       monat-Jahr = aktueller monat 
#               case num = empty -> num = 1
#               case num = !empty -> nume +1