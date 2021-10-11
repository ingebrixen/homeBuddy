<?php




class App
{
    public static function getBaseUrl()
    {
        return "http://localhost:3000";
    }
    public static function getModel(string $model, array $data = [])
    {
        $class = "\\Model\\$model";
        return new $class($data);
    }
    public static function getResourceModel(string $model)
    {
        $class = "\\Model\\Resource\\$model";
        return new $class();
    }
}
