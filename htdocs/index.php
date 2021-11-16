<?php

include('../config.php');

function autoloader($class)
{
    //$newName = str_replace('\\', DIRECTORY_SEPARATOR, $class);
    $path = "lib/".str_replace('\\', DIRECTORY_SEPARATOR, $class).".php";
    if (!class_exists($class)) {
        if (file_exists($path)) {
            require $path;
        }
    }
}
spl_autoload_register('autoloader');

ini_set('display_errors', true);
ini_set('error_reporting', E_ALL);

define('BASEPATH', dirname(__FILE__));

$bootstrap = new Bootstrap();
$bootstrap->run();
