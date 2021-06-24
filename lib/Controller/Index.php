<?php
/**  (c) Thomas Böhme
*    www.ingebrixen.de
*
**/

namespace Controller;

use Model\Benutzer;
use Session\User;

class Index extends Base
{
    public function indexAction($params)
    {   
        $this->_checkLogin();
        // resource model instanzieren
        /** @var \Model\Resource\Bild $model */
        // $model = \App::getResourceModel('Bild');
        //  Models werden jetzt hier über ein Factory Pattern erzeugt
        // Bilder abrufen
        // $bilder = $model->getBilder();
        
        // bilder darstellen/ template
        echo $this->render('dashboard.phtml', array());
        //  bilder.phtml und das assoziative array werden als parameter an render in Base übergeben
    }
    public function registerAction($params)
    {   
        if ($this->isPost()) 
        {
            //User::initSession();
            /** @var \Model\Resource\Benutzer $regResource */
            $regResource = \App::getResourceModel('Benutzer');

            $regOK = true;
    
            // abfragen ob Mail valide ist
            if (!\filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
                \Session\Msg::setMsg('Mailadresse ungültig');
                $regOK = false;
            }            
            // abfragen ob passwort das gleiche ist
            elseif ($_POST['PW'] != $_POST['checkPW']) {
                \Session\Msg::setMsg('Passwörter sind nicht gleich');
                $regOK = false;
            }
            // abfragen ob AGBs bestätigt wurden
            else if (!isset($_POST['agb']) || !$_POST['agb']) {
                \Session\Msg::setMsg('Bitte AGB akzeptieren');
                $regOK = false;
            }
            if ($regOK /* && $regResource->regUser($_POST['email'], $_POST['PW']) */) {
                \Session\Msg::setMsg('Neue Accounts können derzeit nicht angelegt werden!');
                /* $this->_goToLogin(); */
            }

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
        $url = \App::getBaseUrl() . 'index/login';
        header('Location: ' . $url);
    }

    
}
