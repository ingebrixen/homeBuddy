<?php

declare(strict_types=1);

namespace Controller;

//use Session\User;
use Util\Kassierer;
use Util\Pagination;
use Util\NumItems;

class Finanzen extends Base {

    private string $_table;
    private string $_colum;
    private string $_model = "Finanzen";
    private string $_order;
    private string $_where;
    private string $_offset;
    
    public function __construct()
    {
        $this->_checkLogin();
    }
    public function indexAction($params)
    {
        $stats = [];

        $_table = "sumByKat";
        $_colum = "kategorie, sumKat";

        $model = \App::getResourceModel('DBHandler');
        $sumByKat = $model->selectData($this->_model, $_table, $_colum, $params);

        $_table = "sumMonth";
        $_colum = "Monat, Summe";

        $sumMonth = $model->selectData($this->_model, $_table, $_colum, $params);

        echo $this->render('dashboard.phtml', array('sumByKat' => $sumByKat, 'sumMonth' => $sumMonth));
    }
    public function haushaltskasseAction($params) 
    {    
        $this->_table = "haushaltskasse";

        $model = \App::getResourceModel('DBHandler');
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $_colum = "id, num, wer, datum, wieviel, stand, womit";
        $_order = "ORDER BY ID DESC";

        $pagination = new Pagination($this->_table, $params);
        $_offset = $pagination->getOffset();

        $data = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order, $_offset);

        $pagination->countItems();

        if ($this->isPost()) 
        {

            if (isset($_POST['privat']) && is_numeric($_POST['privat'])) {
                $_POST['wieviel'] = $_POST['wieviel'] - $_POST['privat'];
            }
            unset($_POST['privat']);

            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            $_POST['num'] = NumItems::incrItems($_POST);

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

                case $_POST['whichForm'] == 'balance' && $_POST['konto'] != '0.00':
                    $_uid = $_POST['uid'];
                    $ausgleich = $updateLend = $updateKonto = $updateKasse =\App::getResourceModel('DBHandler');
                    //  pers. Konto ausgleichen
                    //  nach lend prüfen->update pers. konto->lend
                    //  update pers. konto->konto

                    //  sonderfall monatsanfang->-200, persKonto set to -200
                    //  haushaltskasse automatischer eintrag->Thomas 01.01.2x +200 
                    //  monatsafnag über cron oder cli Methoden aufruf cron.php 
                    //  curl --silent http://domain.com/cron.php Oder php -q /path/to/cron.php

                    switch ($_POST) {
                        case $_POST['konto'] > '0.00':  //  WORKING
                            //normale auszahlung > Konto wird auf Null gesetzt > kein Eintrag in Kasse!
                            $_konto = strval($_POST['konto'] - $_POST['wieviel']);
                            $_lend = "0.00";
                            break;                        
                        case $_POST['konto'] < '0.00':
                        // überprüfen ob schulden vorhanden sind
                        //  überprüfen ob geld geliehen wurde oder die Monatliche Zahlung noch nicht ausgeglichen ist
                            switch ($_POST) {
                                case $_POST['lend'] != '0.00':
                                    if (abs($_POST['lend']) >= $_POST['wieviel']) {
                                        
                                        $_lend = strval($_POST['lend'] + $_POST['wieviel']);
                                        $_konto = strval($_POST['wieviel'] + $_POST['konto']);
                                        $updateLend->updateData('persKonto', 'lend', $_lend, $_uid);
                                        $_POST['womit'] = "lend";
                                        
                                    } else {
                                        //  stand wird nicht aktualisiert
                                        $_konto = strval($_POST['konto'] + $_POST['wieviel']);
                                        $_lend = '0.00';
                                        $updateLend->updateData('persKonto', 'lend', $_lend, $_uid);
                                        $rest = $_POST['lend'] + $_POST['wieviel'];
                                        $_POST['wieviel'] = abs($_POST['lend']);
                                        $_POST['womit'] = 'lend';
                                        unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']);
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
                                default:    //  WORKING
                                    //  es sind keine schulden vorhanden > einfach Eintrag in kasse 
                                    echo "alles iO";
                                    $_konto = strval($_POST['konto'] + $_POST['wieviel']);
                                    $_POST['womit'] = "einz";
                                    break;
                            }
                        unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']);
                        $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                        if ($updateKasse->insertData('haushaltskasse', $_POST)) {
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
                        //  wenn lend -10 > ausgabe 5
                        if (abs($_POST['lend']) >= $_POST['wieviel']) {
                            
                            $_lend = $_konto = strval($_POST['wieviel'] + $_POST['lend']);
                            $_POST['womit'] = 'lend';
                        } else {
                            $_konto = strval($_POST['wieviel'] + $_POST['lend']);
                            $_lend = '0.00';
                            $rest = $_POST['lend'] + $_POST['wieviel'];
                            $_POST['wieviel'] = abs($_POST['lend']);
                            $_POST['womit'] = 'lend';
                            //  ausgleich ausführen > rest muss konto gutgeschrieben und von der kasse abgezogen werden.
                            unset($_POST['whichForm'], $_POST['lend'], $_POST['konto'],$_POST['uid']);
                            $ausgleich = \App::getResourceModel('DBHandler');
                            $ausgleich->insertData('haushaltskasse', $_POST);
                            $_POST['womit'] = 'self';
                            $_POST['wieviel'] = 0 - $rest;
                            $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                        }
                    } else {

                        $_konto =  strval($_POST['wieviel'] + $_POST['konto']); 
                        $_lend = '0.00';
                        $_POST['wieviel'] = strval(0 - $_POST['wieviel']); 
                        $_POST['stand'] = $_POST['stand'] + $_POST['wieviel']; 
                        
                    }
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
                                
                }   
        } 
        echo $this->render('haushaltskasse.phtml', array('pagination' => $pagination, 'dataSet' => $data));       
    }
    public function ausgabenAction($params)
    {
        $this->_table = "ausgaben";

        $_colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";        
        $_order = "ORDER BY ID DESC";

        $pagination = new Pagination($this->_table, $params);
        $_offset = $pagination->getOffset();

        $model = \App::getResourceModel('DBHandler');
        $data = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order, $_offset);

        $pagination->countItems();

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
        echo $this->render('ausgaben.phtml', array('pagination' => $pagination, 'dataSet' => $data));
    }
    public function fredericoAction($params)
    {
        echo $this->render('dashboard.phtml', array());
    }

}
