<?php


namespace Controller;


class Kueche extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) 
    {

        echo $this->render('portal.phtml', array());
    }
    public function einkaufAction($params) 
    {

        echo $this->render('portal.phtml', array());
    }
    public function rezepteAction($params) 
    {

        echo $this->render('rezepte.phtml', array());
    }

}