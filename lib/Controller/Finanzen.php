<?php

namespace Controller;

use Model\Settler;
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
        $model = \App::getResourceModel('Settler');
        $kasse = $model->getHaushaltsbuch();

        if ($this->isPost()) 
        {
            /** @var \Model\Resource\Settler $getResource */
            $getResource = \App::getResourceModel('Settler');

            if ($getResource->addMoney($_POST['wer'], $_POST['uri'], $_POST['inorout'], $_POST['wann'], $_POST['wieviel'], $_POST['womit'], $_POST['privat'], $_POST['wo'])) {
                $url = \App::getBaseUrl() . 'finanzen/haushaltskasse';
                header('Location: ' . $url);
            }
        }
        echo $this->render('detail.phtml', array('kasse' => $kasse));
    }
    public function ausgabenAction($params)
    {
        if ($this->isPost()) 
        {
            /** @var \Model\Resource\Settler $getResource */
            $getResource = \App::getResourceModel('Settler');

            if ($getResource->addMoney('ausgaben',$_POST['inorout'],$_POST['wer'], $_POST['wann'], $_POST['wieviel'], $_POST['womit'], $_POST['privat'], $_POST['wo'])) {
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