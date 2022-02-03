<?php


namespace Session;

class User
{
    public static function setItemLimit()
    {
        if(isset($_POST['itemLimit'])){
            $_SESSION['items'] = $_POST['itemLimit'];

            return $_SESSION['items'];
        }
        if (isset($_SESSION['items'])) {
            return $_SESSION['items'];
        }
        return 10;
    }
    public static function login($email, $pass)
    {
        self::initSession();

        $resourceModel = \App::getResourceModel('Benutzer');
        $benutzer = $resourceModel->authUser($email, $pass);

        if ($benutzer != false) {
            $_SESSION['userId'] = $benutzer->getId();
            $_SESSION['userEmail'] = $benutzer->getEmail();
            $_SESSION['userName'] = $benutzer->getName();

            return true;
        } else {
            $_SESSION['msg'] = "Login Fehlgeschlagen";
        }

        return false;
    }
    public static function logout()
    {
        self::initSession();
        \session_destroy();
    }
    public static function isLoggedIn()
    {
        self::initSession();

        if (isset($_SESSION['userId'])) {
            return true;
        }

        return false;
    }
    public static function initSession()
    {
        if (session_status() == PHP_SESSION_NONE) {
            \session_start();
        }
    }
}
