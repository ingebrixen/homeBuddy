<?php

namespace Controller;


//      überprüfen ob schulden oder ein positiver kontostand vorhanden sind und entsprechend verrechnen
//      Monatsanfang.  Add 200 zur haushaltskasse & -200 zu pers Konto
//      aufgerufen über curl --silent http://domain.com/cron.php php -q ../cron.php
class Cron 
{
        public function indexAction()
                {              
                        echo 'hallo welt!';
                        $_model = 'Finanzen';
                        $_table = 'persKonto';
                        $_colum = 'id, konto, lend';

                        $query = 'SELECT '.$_colum.' FROM '.$_table;

                        $model = \App::getResourceModel('DBHandler');

                        $dataSet = $model->selectData($_model, $_table, $_colum);
                        foreach($dataSet as $obj) {
                                $id = $obj->getId();
                                $konto = $obj->getKonto() - 200;
                                        
                                $model->updateData($_table, 'konto', $konto, $id);
                                }
                }      
}
