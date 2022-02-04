<?php

namespace Controller;


//      überprüfen ob schulden oder ein positiver kontostand vorhanden sind und entsprechend verrechnen
//      Monatsanfang.  Add 200 zur haushaltskasse & -200 zu pers Konto
//      aufgerufen über curl --silent http://domain.com/cron.php oder php -q ../cron.php


class Cron 
{
        public function __construct()
        {
                $this->model = \App::getResourceModel('DBHandler');
        }
        public function indexAction()
        {       
                $_model = 'Finanzen';
                $_table = 'persKonto';
                $_colum = 'id, konto, lend';
                $minusGesamt = 0;
                $minusKonto = 0;                             

                $data = $this->model->selectData($_model, $_table, $_colum);  
                
                //      summiert alle Kontostände um das Gesamt Minus zu bekommen
                foreach ($data as $obj) {
                        $minusKonto = $minusKonto + $obj->getKonto();
                }
                $minusKonto = 0 - $minusKonto;
                
                //      aufgerundeter anteil des Gesamt Minus
                $anteil = (floor(($this->_checkStand() + $minusKonto) / $this->_getUserCount() * 2) / 2);

                $val = $anteil < 0 ? $anteil - 200 : 200;
               
                foreach($data as $obj) {
                        $id = $obj->getId();
                        $konto = $obj->getKonto() - abs($val);
                                
                        $this->model->updateData($_table, 'konto', $konto, $id);
                        }
        }
        private function _checkStand(): float
        {
                $stand =  \Util\Tops::getTopStand()[0]->getStand();

                return $stand;
        }
        private function _getUserCount(): int
        {
                $count = count($this->model->selectData('Benutzer', 'user', 'id'));

                return $count;
        }
        private function _getPrivKonto()
        {
                $kontos = $this->model->selectData('Finanzen', );
        }
}
