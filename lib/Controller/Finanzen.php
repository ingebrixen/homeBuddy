<?php

namespace Controller;

class Finanzen extends Base {

    public function indexAction($params)
    {
        $this->_checkLogin();

        echo $this->render('dashboard.phtml', array());
    }
    public function haushaltskasseAction($params) 
    {
        $this->_checkLogin();

        echo $this->render('dashboard.phtml', array());
    }
    public function ausgabenAction($params)
    {
        $this->_checkLogin();

        echo $this->render('dashboard.phtml', array());
    }
    public function vanlifeAction($params)
    {
        $this->_checkLogin();

        echo $this->render('dashboard.phtml', array());
    }

}