<?php
/**  (c) Thomas Böhme **/



class App
{
    public static function getBaseUrl()
    {
        return "http://localhost:3000";
    }
    public static function getModel(string $model)
    {
        $class = "\\Model\\$model";
        return new $class();
    }
    public static function getResourceModel(string $model)
    {
        $class = "\\Model\\Resource\\$model";
        return new $class();
    }
}
