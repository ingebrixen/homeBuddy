<?php
declare(strict_types=1);

namespace Util;

use Util\NumItems;

class Kassierer extends Base {

        private string $_uid, $_lend, $_wviel, $_wmit, $_wForm, $_konto, $_stand, $_rest;
        private array $_post;
        private bool $hasError = false;

        public function __construct(array $_post)
        {
                if (isset($_post['privat']) && is_numeric($_post['privat'])) {
                        $_post['wieviel'] = $_post['wieviel'] - $_post['privat'];
                    }
                    unset($_post['privat']);
        
                    $_post['datum'] = date('Y-m-d', strtotime($_post['datum']));
                    $_post['num'] = NumItems::incrItems($_post);

                $this->_uid = $_post['uid'];

                self::modeSelector($_post);                
        }
        private  function modeSelector(array $_post)
        {
                switch ($_post) {
                        case $_post['wForm'] == 'balance' && $_post['konto'] == '0.00':

                                self::lendMoney($_post)->updateKasse()->updateLend()->updateKonto()->checkStatus();

                                break;
                        case $_post['wForm'] == 'balance' && $_post['konto'] != '0.00':                                
                                switch ($_post) {
                                        case $_post['konto'] > '0.00':
                                                //      normale auszahlung > Konto wird auf Null gesetzt > kein Eintrag in Kasse!
                                                self::ausgleichKonto($_post)->updateKonto();     

                                            break;
                                        case $_post['konto'] < '0.00':
                                            switch ($_post) {
                                                case $_post['lend'] != '0.00':
                                                    if (abs($_post['lend']) >= $_post['wieviel']) {
                                                        
                                                        self::reCalLend($_post)->updateLend();
                                                                                              
                                                    } else {
                                                        //  stand wird nicht aktualisiert
                                                        $_konto = strval($_POST['konto'] + $_POST['wieviel']);
                                                        $_lend = '0.00';
                                                        $updateLend->updateData('persKonto', 'lend', $_lend, $_uid);
                                                        $rest = $_POST['lend'] + $_POST['wieviel'];
                                                        $_POST['wieviel'] = abs($_POST['lend']);
                                                        $_POST['womit'] = 'lend';
                                                        unset($_POST['wForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']);
                                                        $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                                                        //  stand muss aktualisiert werden
                                                        $ausgleich = \App::getResourceModel('DBHandler');
                                                        $ausgleich->insertData('haushaltskasse', $_POST);
                                                        $_POST['womit'] = 'einz';
                                                        $_POST['wieviel'] = $rest;
                                                        //$_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                                                        
                                                    }
                                                    //  Es sind schulden vorhanden > Eintrag in kasse > womit = lend
                                                    //  wenn lend kleiner ist als konto fehlt hier auch die monatliche zahlung > Eintrag Kasse
                                                    break;
                                                case $_POST['lend'] == '0.00':   //  WORKING
                                                    //  es sind keine schulden vorhanden > einfach Eintrag in kasse 
                                                    $_konto = strval($_POST['konto'] + $_POST['wieviel']);
                                                    $_POST['womit'] = "einz";
                                                    break;
                                            }
                                        unset($_post['wForm'], $_post['lend'], $_post['konto'],$_post['uid']);
                                        $_post['stand'] = $_POST['stand'] + $_post['wieviel'];
                                        if ($updateKasse->insertData('haushaltskasse', $_post)) {
                                            $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                                            header('Location: ' . $url); 
                                        };
                                        break;
                                    }
                                if ($updateKonto->updateData('persKonto', 'konto', $_konto, $_uid)) {
                                $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                                header('Location: ' . $url); 
                                }
                                break;
                        case $_post['wForm'] == 'add' && $_post['womit'] == 'self':
                                # code...
                                break;
                        
                        case $_post['wForm'] == 'add' && $_post['womit'] == 'kasse':
                                self::shopWithKasse($_post)->updateKasse();
                                break;
                }  
        }
        private function reCalLend(array $_post)
        {
                $this->_lend = strval($_post['lend'] + $_post['wieviel']);
                $this->_konto = strval($_post['wieviel'] + $_post['konto']);

                $_post['womit'] = "lend";

                $this->_post = $_post;

                return $this;
        }
        private function ausgleichKonto(array $_post)
        {
                $this->_konto = strval($_post['konto'] - $_post['wieviel']);
                $this->_lend = "0.00";

                return $this;
        }
        private function lendMoney(array $_post)
        {
                $this->_lend = $this->_konto = $this->_wieviel = $_post['wieviel'] = strval(0 - $_post['wieviel']);
                $_post['stand'] = $_post['stand'] + $_post['wieviel'];
                $_post['womit'] = 'lend';

                unset($_post['wForm'], $_post['lend'], $_post['konto'],$_post['uid']); 
                
                $this->_post = $_post;

                return $this;
        }
        private function shopWithKasse(array $_post)
        {
                $_post['wieviel'] = strval(0 - $_post['wieviel']);
                $_post['stand'] = $_post['stand'] + $_post['wieviel'];

                unset($_post['wForm'], $_post['lend'], $_post['konto'],$_post['uid']);

                $this->_post = $_post;

                return $this;
        }
        private function updateKasse()
        {
                $udKasse = \App::getResourceModel('DBHandler');

                if(!$udKasse->insertData('haushaltskasse', $this->_post))  {
                        $this->hasError = true;
                };

                return $this;
        }
        private function updateKonto()
        {
                $udKonto = \App::getResourceModel('DBHandler');

                if(!$udKonto->updateData('persKonto', 'konto', $this->_konto, $this->_uid))  {
                        $this->hasError = true;
                };

                return $this;
        }
        private function updateLend()
        {
                $udLend = \App::getResourceModel('DBHandler');

                if(!$udLend->updateData('persKonto', 'lend', $this->_lend, $this->_uid)) {
                        $this->hasError = true;
                };   
                
                return $this;
        }
        public function checkStatus()
        {
                if (!$this->hasError) {
                        echo "hello World";
                }
                
        }

        //function has error? um checkstatus zwischen den inserts und updates auszuführen?
}

/* 

wForm
uid
wer 
konto 
datum 
stand 
lend 
wieviel
womit
privat
wo


*/