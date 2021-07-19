<?php

namespace Controller;

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
        

        echo $this->render('detail.phtml', array());
    }
    public function ausgabenAction($params)
    {
        

        echo $this->render('detail.phtml', array());
    }
    public function vanlifeAction($params)
    {
        

        echo $this->render('detail.phtml', array());
    }

}