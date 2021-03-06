<?php

namespace Controller;

use Session\User;

class Index extends Base
{
    public function __construct()
    {
        
    }
    public function indexAction($params)
    {   
        $this->_checkLogin();
        
        $_table = "sumByKat";
        $_colum = "kategorie, sumKat";
        $_model = "Finanzen";

        $model = \App::getResourceModel('DBHandler');
        $sumByKat = $model->selectData($_model, $_table, $_colum, $params);

        $_table = "sumMonth";
        $_colum = "Monat, Summe";

        $sumMonth = $model->selectData($_model, $_table, $_colum, $params);

        echo $this->render('dashboard.phtml', array('sumByKat' => $sumByKat, 'sumMonth' => $sumMonth));


    }
    public function registerAction($params)
    {   
        $regAllowed = regOption; 

        if ($regAllowed) {
            if ($this->isPost()) 
            {   //User::initSession();
                /** @var \Model\Resource\Benutzer $regResource */
                $regResource = \App::getResourceModel('Benutzer');

                $regOK = false;    
                    // abfragen ob Mail valide ist
                    if (!preg_match('/^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/iD
                    ', $_POST['email'])) {
                        \Session\Msg::setMsg('Mailadresse ung??ltig');
                        $regOK = false;
                    }    
                    elseif (!isset($_POST['name']) || !$_POST['name']) {
                        \Session\Msg::setMsg('Bitte gibt einen Benutzernamen an');
                        $regOK = false;
                    }
                    elseif (strlen($_POST['PW']) < 12) {
                        \Session\Msg::setMsg('Passwort ist zu kurz');
                        $regOK = false;
                    }
                    // abfragen ob passwort das gleiche ist
                    elseif ($_POST['PW'] != $_POST['checkPW']) {
                        \Session\Msg::setMsg('Passw??rter sind nicht gleich');
                        $regOK = false;
                    }
                    // abfragen ob AGBs best??tigt wurden
                    elseif (!isset($_POST['agb']) || !$_POST['agb']) {
                        \Session\Msg::setMsg('Bitte AGB akzeptieren');
                        $regOK = false;
                    }
                    if ($regOK && $regResource->regUser($_POST['name'], $_POST['email'], $_POST['PW'])) {
                        \Session\Msg::setMsg('Registrierung erfolgreich!');
                        //$this->_goToLogin();
                    }
            }
        } else{
            \Session\Msg::setMsg('Neue Accounts k??nnen im Moment nicht angelegt werden!');
        }        
        echo $this->render('register.phtml', array());
    }
    public function loginAction($params)
    {
        if ($this->isPost()) {
            if (User::login($_POST['email'], $_POST['password'])) {
                header('Location: ' . \App::getBaseUrl());
            }
        }
        echo $this->render('login.phtml', array());
    }
    public function logoutAction($params) {
        User::logout();

        $this->_goToLogin();
    }

    protected function _goToLogin()
    {
        $url = \App::getBaseUrl() . '/index/login';
        header('Location: ' . $url);
    }

    
}
