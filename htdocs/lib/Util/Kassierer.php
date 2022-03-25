<?php
declare(strict_types=1);

namespace Util;

class Kassierer extends Base {

        protected string $_uid, $_lend, $_konto;
        protected array $_post;
        protected float $rest;

        public function __construct($_post)
        {                
                $this->_uid = $_post['uid'];

                $this->_post = $_post;

        }
        public function shopOwnMoney()
        {
                if ($this->_post['lend'] < '0.00') { 
                        if (abs($this->_post['lend']) >= $this->_post['wieviel']) {
                                
                                $this->_lend = $this->_konto = strval($this->_post['wieviel'] + $this->_post['lend']);
                                $this->_post['womit'] = 'lend';

                        } else {

                                $this->_konto = strval($this->_post['wieviel'] + $this->_post['lend']);
                                $this->_lend = '0.00';

                                $this->rest = $this->_post['lend'] + $this->_post['wieviel'];

                                $this->_post['wieviel'] = abs($this->_post['lend']);
                                $this->_post['womit'] = 'lend';
                                $this->_post['stand'] = $this->_post['stand'] + abs($this->_post['lend']);
                                
                                $this->unsetPost();

                                $this->updateKasse($this->_post);
                                
                                $this->_post['womit'] = 'self';
                                $this->_post['wieviel'] = 0 - $this->rest;
                                $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];
                                
                        }
                } else {

                        $this->_konto = strval($this->_post['wieviel'] + $this->_post['konto']); 
                        $this->_lend = '0.00';
                        $this->_post['wieviel'] = strval(0 - $this->_post['wieviel']); 
                        $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel']; 
                
                }
                $this->unsetPost();

                $this->_post['num'] = NumItems::incrItems($this->_post);

                $this->updateLend();
                $this->updateKonto();
                $this->updateKasse($this->_post);
        }
        public function shopWithKasse()
        {
                $this->_post['wieviel'] = strval(0 - $this->_post['wieviel']);
                $this->_post['stand'] = $this->_post['stand'] + $this->_post['wieviel'];
                
                $this->unsetPost();

                $this->updateKasse($this->_post);
        }
}