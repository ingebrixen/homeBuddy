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
        echo $this->render('portal.phtml', array());
    }
}