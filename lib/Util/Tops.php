<?php


namespace Util;

use Model\Finanzen;
use Model\Resource\DBHandler;


class Tops
{
    public static function topAusgaben()
    {
        $model = '/finanzen/foo';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTopAusgaben($model);
        
        return $dataSet;
    }
    public static function topKasse()
    {
        $model = 'Finanzen';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTopKasse($model);
        
        return $dataSet;
    }
}