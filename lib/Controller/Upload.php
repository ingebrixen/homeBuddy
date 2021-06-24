<?php
/**  (c) Thomas Böhme **/



namespace Controller;

use Session\User;
use Util\Image;

class Upload extends Base {

    public function indexAction($params) {

        $this->_checkLogin();

        echo $this->render('upload.phtml', array());
    }

    public function saveAction($params) {

        $this->_checkLogin();

        if (!$this->isFileUpload()) {
            throw new \RuntimeException('Kein Dateiupload');
        }

        $newId = Image::processUpload($_FILES['uploadImg']);
        if (!$newId) {
            User::initSession();
            $_SESSION['msg'] = "Uploadfehler beim speichern";
            return;
        }

        $url = \App::getBaseUrl() . 'index/index/id/' . $newId;
        header('Location: ' . $url);
    }

/*     protected function _checkLogin()
    {
        if (!User::isLoggedIn()) {
            $url = \App::getBaseUrl() . 'index/login';
            header('Location: ' . $url);
        }
    } */
}