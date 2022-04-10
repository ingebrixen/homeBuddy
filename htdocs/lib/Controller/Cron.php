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
                
                /* //      summiert alle privaten Kontostände um das Gesamt Minus zu bekommen > float(-25.5)
                foreach ($data as $obj) {
                        $minusKonto = $minusKonto + $obj->getKonto();
                }                
                //      erzeugt wenn negativ die positve Summe alle priv. Kontostände > float(25.5) 
                $minusKonto = $minusKonto < 0 ? 0 - $minusKonto : $minusKonto; */

                //      aufgerundeter Anteil des gesamt Minus durch die vorhandenen User > -8.5
                $anteil = (floor(($this->_checkStand()) / $this->_getUserCount() * 2) / 2);
                var_dump($anteil);
                //      wenn Haushalskassen < 200: muss jeder eine höhhere Einzahlung machen, sonst standard 200€
                $val = $anteil < 0 ? $anteil - 200 : 200;
                var_dump($val);

                //      verrechnung des alten, nicht abgerechneten Kontostandes mit dem Betrag der diesen Monat eingezahlt werden muss.
                foreach($data as $obj) {
                        $id = $obj->getId();
                        $konto = $obj->getKonto() - abs($val);
                                
                        $this->model->updateData($_table, 'konto', $konto, $id);
                        }
        }
        private function _checkStand(): float
        {
                $stand =  \Util\Tops::getTopStand()[0]->getStand();
                if ($stand < 0) {
                        return $stand;
                }
                return 0;
                
        }
        private function _getUserCount(): int
        {
                $count = count($this->model->selectData('Benutzer', 'user', 'id'));

                return $count;
        }
}
