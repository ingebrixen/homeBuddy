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
        echo $this->render('dashboard.phtml', array());
    }
    public function haushaltskasseAction($params) 
    {    
        $this->_table = "haushaltskasse";

        $model = \App::getResourceModel('DBHandler');
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $_colum = "id, wer, datum, wieviel, stand";
        
        $_order = "ID DESC";
        $dataSet = $model->selectData($this->_model, $this->_table, $_colum, $params);
        
        
        if ($this->isPost()) 
        {      
            $_POST['wieviel'] = isset($_POST['privat']) ? 0 - ($_POST['wieviel'] - $_POST['privat']) : 0 - ($_POST['wieviel']);
            unset($_POST['privat']);
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            $getResource = \App::getResourceModel('DBHandler');
         switch ($_POST) {

                case $_POST['whichForm'] == 'balance':
                    unset($_POST['whichForm']);
                    $newKonto =  strval($_POST['konto'] + $_POST['wieviel']);
                    $table = 'persKonto';
                    $colum = 'konto';
                    $getResource->updateData($table, $colum, $newKonto, $_POST['userId']);
                    break;

                case $_POST['whichForm'] == 'add' && $_POST['womit'] == 'kasse':
                    unset($_POST['whichForm']);
                    $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                    if ( $getResource->insertData($this->_table, $_POST) ) {                
                    $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                    header('Location: ' . $url);     
                    };
                    break;

                default:
                    unset($_POST['whichForm']);
                    $newKonto =  strval($_POST['konto'] - $_POST['wieviel']);
                    $table = 'persKonto';
                    $colum = 'konto';
                    $getResource->updateData($table, $colum, $newKonto, $_POST['userId']);
                    
                    unset($_POST['userId'], $_POST['konto']);
                    $_POST['stand'] = $_POST['stand'] + $_POST['wieviel'];
                    if ( $getResource->insertData($this->_table, $_POST) ) {                
                    $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                    header('Location: ' . $url);     
                    };
                    break;
                    
                }   
            
            /** @var \Model\Resource\DBHandler $getResource */            

            
            
            //$getResource = \App::getResourceModel('DBHandler');
            /* if ($getResource->insertData($this->_table, $_POST)) {                
                    $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                    header('Location: ' . $url);     
                    /* echo $this->render('haushaltskasse.phtml', array('data' => $dataSet)); 
                } */
        } 
        echo $this->render('haushaltskasse.phtml', array('data' => $dataSet));       
    }
    public function ausgabenAction($params)
    {
        $this->_table = "ausgaben";

        $_colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";        
        $_order = "ID DESC";

        $model = \App::getResourceModel('DBHandler');
        $dataSet = $model->selectData($this->_model, $this->_table, $_colum, $params);
        
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
