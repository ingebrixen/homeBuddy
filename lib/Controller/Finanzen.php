<?php

declare(strict_types=1);

namespace Controller;

/* use Model\Settler; */
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
        echo $this->render('dashboard.phtml', array());
    }
    public function haushaltskasseAction($params) 
    {    
        $model = \App::getResourceModel('DBHandler');
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $_colum = "id, wer, datum, wieviel, stand";
        $_table = "haushaltskasse";
        $_order = "ID DESC";
        $dataSet = $model->selectData($this->_model, $_table, $_colum, $params);
        
        
        if ($this->isPost()) 
        {
            //auswahl abrechnen oder ausgleichen
            //jeden monat automatisch -200
            //wenn womit = self > insertData perskonto
            //stand = stand - wieviel


            $_table = "haushaltskasse";
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['wieviel'] = 0 - $_POST['wieviel'];
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            if ($getResource->insertData($_table, $_POST)) {                
                    $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                    header('Location: ' . $url);     
                    /* echo $this->render('haushaltskasse.phtml', array('data' => $dataSet)); */            
                }
        } 
        echo $this->render('haushaltskasse.phtml', array('data' => $dataSet));       
    }
    public function ausgabenAction($params)
    {
        $model = \App::getResourceModel('DBHandler');
        $_colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";
        $_table = "ausgaben";
        $_order = "ID DESC";
        $dataSet = $model->selectData($this->_model, $_table, $_colum, $params);
        
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
        if ($getResource->insertData($_table, $_POST)) {                
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
