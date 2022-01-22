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
                $this->_post = $_post;
                


                self::modeSelector();
                //      check which case
                
        }
        private  function modeSelector()
        {
                switch ($this->_post) {
                        case $this->_post['wForm'] == 'balance' && $this->_post['konto'] == '0.00':
                                # code...
                                break;
                        
                        case $this->_post['wForm'] == 'balance' && $this->_post['konto'] != '0.00':
                                # code...
                                break;
                        case $this->_post['wForm'] == 'add' && $this->_post['womit'] == 'self':
                                # code...
                                break;
                        
                        case $this->_post['wForm'] == 'add' && $this->_post['womit'] == 'kasse':
                                self::shopWithKasse()->updateKasse();
                                break;
                }  
        }
        private function shopWithKasse()
        {
                $this->_post['wieviel'] = strval(0 - $this->_post['wieviel']);
                $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];
                unset($this->_post['wForm'], $this->_post['lend'], $this->_post['konto'],$this->_post['uid']);
                return $this;
        }
        private function updateKasse()
        {
                $udKasse = \App::getResourceModel('DBHandler');

                if(!$udKasse->insertData('haushaltskasse', $this->_post))  {
                        $this->hasError = true;
                };
        }
        private function updateKonto()
        {
                $udKonto = \App::getResourceModel('DBHandler');

                if(!$udKonto->updateData('persKonto', 'konto', $_wieviel, $_uid))  {
                        $this->hasError = true;
                };
        }
        private function updateLend()
        {
                $udLend = \App::getResourceModel('DBHandler');

                if(!$udKLend->updateData('persKonto', 'lend', $_wieviel, $_uid)) {
                        $this->hasError = true;
                };                
        }
        public function checkStatus()
        {
                return $this->hasError;
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