<?php


namespace Controller;

class Wohnung extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) 
    {

        echo $this->render('portal.phtml', array());
    }
    public function wasserAction($params) 
    {

        echo $this->render('portal.phtml', array());
    }
    public function heizungAction($params) 
    {

        echo $this->render('portal.phtml', array());
    }

}