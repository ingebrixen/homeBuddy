<?php


namespace Session;

class Msg {

    public static function setMsg(string $msg)
    {
        User::initSession();
        $_SESSION['msg'] = $msg;
    }

    public static function readMsg() {
        
        User::initSession();

        $msg = $_SESSION['msg'];
        unset($_SESSION['msg']);

        return $msg;
    }

    public static function hasMsg() {
        User::initSession();

        if (isset($_SESSION['msg'])) {
            return true;
        }

        return false;
    }
}