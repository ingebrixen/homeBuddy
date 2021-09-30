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
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $colum = "id, wer, datum, wieviel, stand";
        $data = $model->selectData($_SERVER['REQUEST_URI'], $colum, $params);
        
        if ($this->isPost()) 
        {
            
            // array(6) { ["wer"]=> string(6) "Thomas" ["wann"]=> string(10) "2021-09-29" ["wieviel"]=> string(3) "-14" ["womit"]=> string(4) "self" ["privat"]=> string(0) "" ["wo"]=> string(0) "" }
            //$_POST =    ["wer"=> "Thomas", "wann"=>  "2021-09-29", "inorout" => "-", "wieviel"=> "45", "womit"=> "self", "privat"=> "1", "wo"=> "test" ];
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');
            $_POST['wieviel'] = $_POST['inorout'].$_POST['wieviel'];
            unset($_POST['inorout']);
            $_POST['datum'] = date('Y-m-d', strtotime($_POST['datum']));
            //return var_dump($_POST).$_SERVER['REQUEST_URI'];
            
        if ($getResource->addData($_SERVER['REQUEST_URI'], $_POST)) {                
                $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                header('Location: ' . $url);                
            }
        } 
        echo $this->render('haushaltskasse.phtml', array('kasse' => $data));       
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
