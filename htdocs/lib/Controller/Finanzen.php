<?php

declare(strict_types=1);

namespace Controller;

use Session\User;

class Finanzen extends Base {

    private string $_table = "";
    private string $_colum = "";
    private string $_model = "Finanzen";
    private string $_order = "";
    private string $_where = "";
    
    public function __construct()
    {
        $this->_checkLogin();
    }
    public function indexAction($params)
    {
        $this->_table = "sumByKat";

        $_colum = "kategorie, sumKat";

        $model = \App::getResourceModel('DBHandler');
        $dataSet = $model->selectData($this->_model, $this->_table, $_colum, $params);

        echo $this->render('dashboard.phtml', array('data' => $dataSet));
    }
    public function haushaltskasseAction($params) 
    {    
        $this->_table = "haushaltskasse";

        $model = \App::getResourceModel('DBHandler');
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $_colum = "id, wer, datum, wieviel, stand, womit";
        $_order = "ORDER BY ID DESC";

        $dataSet = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order);
        
        
        if ($this->isPost()) 
        {      
            $_POST['wieviel'] = isset($_POST['privat']) ? $_POST['wieviel'] - $_POST['privat'] : $_POST['wieviel'];
            unset($_POST['privat']);
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            switch ($_POST) {
                case $_POST['whichForm'] == 'balance' && $_POST['konto'] == '0.00':
                    //  geld leihen 
                    //  update pers konto->lend(-)->konto(-) und haushaltskasse(-)
                    $_wieviel = $_POST['wieviel'] = strval(0 - $_POST['wieviel']);
                    $_uid = $_POST['uid'];
                    $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                    unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']); 
                    $_POST['womit'] = 'lend';
                    $updateLend = $updateKonto = $updateKasse =\App::getResourceModel('DBHandler');
                    
                    $updateLend->updateData('persKonto', 'lend', $_wieviel, $_uid);
                    $updateKonto->updateData('persKonto', 'konto', $_wieviel, $_uid);
                    if ($updateKasse->insertData('haushaltskasse', $_POST)) {
                        $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                        header('Location: ' . $url); 
                    }
                    break;
                case $_POST['whichForm'] == 'add' && $_POST['womit'] == 'self':
                    $_uid = $_POST['uid'];
                    //  Bezahlung erfolgt mit eigenem Geld
                    //  update pers. konto->konto(+) 
                    //  insert in Haushaltskasse(-)
                    //  verrechnen mit lend wenn geld geliehen wurde

                    //  Fehler: wenn schon geld geliehen wurde und man einkaufen geht, wird zwar lend und konto auf null gesetzt, 
                    //  der Betrag aber extra noch von der kasse abgezogen. somit hat man eine doppelte ausgabe obwohl das geld 
                    //  nur ausgeglichen wurde




                    if ($_POST['lend'] < '0.00') { 
                        if (abs($_POST['lend']) > $_POST['wieviel']) {
                            $_lend = $_konto = strval($_POST['wieviel'] + $_POST['lend']);
                        }
                        $_konto = strval($_POST['wieviel'] + $_POST['lend']);
                        $_lend = '0.00';
                    } else {
                        $_konto =  strval($_POST['wieviel'] + $_POST['konto']); 
                        $_lend = '0.00';  
                    }
                    $_POST['wieviel'] = strval(0 - $_POST['wieviel']);
                    $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];

                    unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']); 
                    $updateLend = $updateKonto = $updateKasse =\App::getResourceModel('DBHandler');

                    $updateLend->updateData('persKonto', 'lend', $_lend, $_uid);
                    $updateKonto->updateData('persKonto', 'konto', $_konto, $_uid);
                    if ($updateKasse->insertData('haushaltskasse', $_POST)) {
                        $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                        header('Location: ' . $url); 
                    }

                    break;
                case $_POST['whichForm'] == 'add' && $_POST['womit'] == 'kasse':
                    //  Bezahlung erfolgt mit Haushaltsportemonnaie
                    //  insert in Haushaltkasse(-) 
                    $_POST['wieviel'] = strval(0 - $_POST['wieviel']);
                    $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                    unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']); 

                    $updateKasse =\App::getResourceModel('DBHandler');
                    
                    if ($updateKasse->insertData('haushaltskasse', $_POST)) {
                        $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                        header('Location: ' . $url); 
                    }                    
                
                    break;                    
                case $_POST['whichForm'] == 'balance':
                    $_uid = $_POST['uid'];
                    $updateLend = $updateKonto = $updateKasse =\App::getResourceModel('DBHandler');
                    //  pers. Konto ausgleichen
                    //  nach lend prüfen->update pers. konto->lend
                    //  update pers. konto->konto

                    //  sonderfall monatsanfang->-200, kasse set to +200
                    //  haushaltskasse automatischer eintrag->Thomas 01.01.2x +200 
                    //  monatsafnag über cron oder cli functionsaufruf startMonth.php 
                    //  curl --silent http://domain.com/cron.php Oder php -q /path/to/cron.php

                    switch ($_POST) {
                        case $_POST['konto'] > '0.00':
                            $_konto = strval($_POST['konto'] - $_POST['wieviel']);
                            $_lend = "0.00";
                            break;                        
                        default:
                            $_konto = $_lend = ($_konto - $_lend) + $_POST['wieviel'];// konto->0 kasse->+wieviel
                            break;
                    }
                                        


                    unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']); 
                    

                    $updateLend->updateData('persKonto', 'lend', $_lend, $_uid);
                    $updateKonto->updateData('persKonto', 'konto', $_konto, $_uid);
                    /* if ($updateKasse->insertData('haushaltskasse', $_POST)) {
                        $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                        header('Location: ' . $url); 
                    } */
                    break;                                
                }   
        } 
        echo $this->render('haushaltskasse.phtml', array('data' => $dataSet));       
    }
    public function ausgabenAction($params)
    {
        $this->_table = "ausgaben";

        $_colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";        
        $_order = "ORDER BY ID DESC";

        $model = \App::getResourceModel('DBHandler');
        $dataSet = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order);
        
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            if ($getResource->insertData($this->_table, $_POST)) {                
                    $url = \App::getBaseUrl() . '/finanzen/ausgaben';
                    header('Location: ' . $url);                
                }
        } 
        echo $this->render('ausgaben.phtml', array('data' => $dataSet));
    }
    public function fredericoAction($params)
    {
        echo $this->render('dashboard.phtml', array());
    }

}
