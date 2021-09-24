<?php

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
        if (empty($params)) {
            $params = ["Datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $kasse = $model->selectData($_SERVER['REQUEST_URI'], $params);
        echo $this->render('haushaltskasse.phtml', array('kasse' => $kasse));

        
        
        if ($this->isPost()) 
        {
            // array(8) { ["wer"]=> string(6) "Thomas" ["uri"]=> string(24) "/finanzen/haushaltskasse" ["inorout"]=> string(3) "-" ["Datum"]=> string(10) "2021-09-18" 
            // ["wieviel"]=> string(3) "123" ["womit"]=> string(4) "self" ["privat"]=> string(2) "15" ["wo"]=> string(0) "" }
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');

            if ($getResource->addData($_POST['wer'], $_POST['uri'], $_POST['inorout'], $_POST['wann'], $_POST['wieviel'], $_POST['womit'], $_POST['privat'], $_POST['wo'])) {
                $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                header('Location: ' . $url);                
            }
        }        
    }
    public function ausgabenAction($params)
    {
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\Settler $getResource */
            $getResource = \App::getResourceModel('Settler');

            if ($getResource->addData('ausgaben',$_POST['inorout'],$_POST['wer'], $_POST['wann'], $_POST['wieviel'], $_POST['womit'], $_POST['privat'], $_POST['wo'])) {
                echo $this->render('detail.phtml', array());
            }
        }
        echo $this->render('detail.phtml', array());
    }
    public function vanlifeAction($params)
    {
        echo $this->render('detail.phtml', array());
    }

}