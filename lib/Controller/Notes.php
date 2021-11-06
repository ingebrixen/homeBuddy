<?php


namespace Controller;

use Session\User;
use Util\Image;

class Notes extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) 
    {

        echo $this->render('dashboard.phtml', array());
    }



}