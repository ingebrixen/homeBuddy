<?php


namespace Util;

use Model\Finanzen;
use Model\Resource\DBHandler;


class Tops
{
    private string $_model = '';
    private string $_table = '';
    private string $_colum = '';

    public static function getTopAusgaben()
    {
        $_model = 'Finanzen';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTopAusgaben($_model);
        
        return $dataSet;
    }
    public static function getTopKonto(string $userId)
    {
        $_model = 'Finanzen';
        $_table = 'persKonto';
        $_colum = 'konto';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTopKonto($_model, $userId);
        
        return $dataSet;
    }
    public static function getTopStand() 
    {
        $_model = 'Finanzen';
        $_table = 'haushaltskasse';
        $_colum = 'stand';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTopStand($_model);
        
        return $dataSet;
    }
    public function updatePersKonto()
    {

    }    
}