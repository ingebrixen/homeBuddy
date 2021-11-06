<?php


namespace Controller;

use Session\User;
use Util\Image;

class Todo extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) 
    {

        echo $this->render('dashboard.phtml', array());
    }
    public function einkaufAction($params) 
    {

        echo $this->render('dashboard.phtml', array());
    }
    public function rezepteAction($params) 
    {

        echo $this->render('dashboard.phtml', array());
    }

}