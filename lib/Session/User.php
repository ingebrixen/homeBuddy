<?php


namespace Session;

class User
{
    public static function login($email, $pass)
    {
        self::initSession();

        $resourceModel = \App::getResourceModel('Benutzer');
        $benutzer = $resourceModel->authUser($email, $pass);

        if ($benutzer != false) {
            $_SESSION['user_id'] = $benutzer->getId();
            $_SESSION['user_email'] = $benutzer->getEmail();
            $_SESSION['user_name'] = $benutzer->getName();

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

        if (isset($_SESSION['user_id'])) {
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
