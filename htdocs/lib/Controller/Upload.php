<?php


namespace Controller;

use Session\User;
use Util\Image;

class Upload extends Base {

    public function __construct()
    {
        $this->_checkLogin();
    }

    public function indexAction($params) {

        echo $this->render('upload.phtml', array());
    }

    public function saveAction($params) {


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
}