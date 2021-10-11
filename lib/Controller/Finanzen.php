<?php

declare(strict_types=1);

namespace Controller;

/* use Model\Settler; */
use Session\User;

class Finanzen extends Base {

    
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
        $colum = "id, wer, datum, wieviel, stand";
        $dataSet = $model->selectData($_SERVER['REQUEST_URI'], $colum, $params);
        
        
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['wieviel'] = $_POST['inorout'].$_POST['wieviel'];
            unset($_POST['inorout']);
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            if ($getResource->insertData($_SERVER['REQUEST_URI'], $_POST)) {                
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
        $colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";
        $dataSet = $model->selectData($_SERVER['REQUEST_URI'], $colum, $params);
        
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
        if ($getResource->insertData($_SERVER['REQUEST_URI'], $_POST)) {                
                $url = \App::getBaseUrl() . '/finanzen/ausgaben';
                header('Location: ' . $url);                
            }
        } 
        echo $this->render('ausgaben.phtml', array('data' => $dataSet));
    }
    public function vanlifeAction($params)
    {
        echo $this->render('detail.phtml', array());
    }

}
