<?php


namespace Controller;


class Todo extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) 
    {
        echo $this->render('portal.phtml', array());
    }
}