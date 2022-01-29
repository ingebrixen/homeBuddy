<?php

declare(strict_types=1);

namespace Util;


class Dispatcher {

        private array $_post;


        public function __construct(array $_post)
        {
                if (isset($_post['privat']) && is_numeric($_post['privat'])) {
                        $_post['wieviel'] = $_post['wieviel'] - $_post['privat'];
                    }
                unset($_post['privat']);

                $_post['datum'] = date('Y-m-d', strtotime($_post['datum']));
                $_post['num'] = NumItems::incrItems($_post);


                switch ($_post) 
                {
                        case $_post['wForm'] == 'balance' && $_post['konto'] == '0.00':

                                (new Kontoservice($_post))->geldLeihen();

                                break; 

                        case $_post['wForm'] == 'balance' && $_post['konto'] != '0.00':
                               
                                (new Kontoservice($_post))->privKontoAusgleich();

                                break;
                        case $_post['wForm'] == 'add' && $_post['womit'] == 'self':

                                (new Kassierer($_post))->shopOwnMoney();

                                break;
                        case $_post['wForm'] == 'add' && $_post['womit'] == 'kasse':
                                
                                (new Kassierer($_post))->shopWithKasse();

                                break;  
                }
        }
}