<?php

namespace Util;

class Kontoservice extends Base {

        protected string $_wieviel, $_uid, $_konto, $_lend, $_rest;
        protected array $_post;

        public function __construct($_post)
        {                
                $this->_uid = $_post['uid'];

                $this->_post = $_post;

        }
        public function geldLeihen()
        {
                $this->_konto = $this->_lend = $this->_post['wieviel'] = strval(0 - $this->_post['wieviel']);
                
                $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];

                $this->unsetPost(); 

                $this->_post['womit'] = 'lend';

                $this->updateKasse($this->_post)->updateKonto()->updateLend();
                
        }
        public function privKontoAusgleich()
        {
                switch ($this->_post) {
                        case $this->_post['konto'] > '0.00':  

                                $this->_konto = strval($this->_post['konto'] - $this->_post['wieviel']);
                                $this->_lend = "0.00";

                                break;                        
                        case $this->_post['konto'] < '0.00':

                                switch ($this->_post) {
                                        case $this->_post['lend'] != '0.00':
                                                if (abs($this->_post['lend']) >= $this->_post['wieviel']) {
                                                
                                                        $this->_lend = strval($this->_post['lend'] + $this->_post['wieviel']);
                                                        $this->_konto = strval($this->_post['wieviel'] + $this->_post['konto']);

                                                        $this->updateLend();
                                                        
                                                        $this->_post['womit'] = "lend";  

                                                } else {
                                                        $this->_konto = strval($this->_post['konto'] + $this->_post['wieviel']);
                                                        $this->_lend = '0.00';

                                                        $this->updateLend();

                                                        $this->rest = $this->_post['lend'] + $this->_post['wieviel'];
                                                        $this->_post['wieviel'] = abs($this->_post['lend']);
                                                        $this->_post['womit'] = 'lend';

                                                        $this->unsetPost(); 
                                                        
                                                        $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];

                                                        $this->updateKasse($this->_post);

                                                        $this->_post['womit'] = 'einz';
                                                        $this->_post['wieviel'] = $this->rest;
                                                
                                                }
                                                break;
                                        case $this->_post['lend'] == '0.00':
                                                
                                                $this->_konto = strval($this->_post['konto'] + $this->_post['wieviel']);
                                                $this->_post['womit'] = "einz";

                                                break;
                                        }
                                $this->unsetPost(); 

                                $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];

                                $this->updateKasse($this->_post);

                                break;
                        }
                $this->updateKonto();
        }
}
