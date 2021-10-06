<?php
/**  (c) Thomas Böhme **/



namespace Util;

use Model\Finanzen;
use Model\Resource\DBHandler;


class Tops
{
    public static function topAusgaben()
    {
        $model = \App::getResourceModel('DBHandler');
        $dataSet = $model->getTopAusgaben();
        
        return  $dataSet;
    }
}