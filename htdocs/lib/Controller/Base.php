<?php

namespace Controller;

use Session\User;

class Base
//  Gemeinsame Basisklasse zum rendern von Template Dateien
{
    public function __construct()
    {
        
    }
    public function render(string $template, array $data)
    {
        
        $view = new \View\Template($template);
        return $view->renderTemplate($data);
        //  $template ist der in der index übergebene Dateiname
        //  $data das Daten Array        
    }
    public function isPost()
    {
        if (count($_POST) > 0) {
            return true;
        }
        return false;
    }
    public function isFileUpload()
    {
        if (count($_FILES) > 0) {
            return true;
        }

        return false;

    }
    public function _checkLogin()
    {
        if (!User::isLoggedIn()) {
            $url = \App::getBaseUrl() . '/index/login';
            header('Location: ' . $url);
        } 
    }
}
