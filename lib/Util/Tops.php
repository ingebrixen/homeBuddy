<?php


namespace Util;

use Model\Finanzen;
use Model\Resource\DBHandler;


class Tops
{
    private string $_model = '';
    private string $_table = '';
    private string $_colum = '';
    private string $_userId = '';

    public static function getTopAusgaben()
    {
        $_model = 'Finanzen';
        $query = 'SELECT wer, sum(wieviel) AS sumWieviel FROM ausgaben GROUP BY wer';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function getTopKonto(string $userId)
    {
        $_model = 'Finanzen';
        $_table = 'persKonto';
        $_colum = 'konto';
        $query = 'SELECT konto FROM persKonto WHERE userId = '.$userId.'';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function getTopStand() 
    {
        $_model = 'Finanzen';
        $_table = 'haushaltskasse';
        $_colum = 'stand';
        $query = 'SELECT stand FROM haushaltskasse ORDER BY ID DESC LIMIT 1';
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function calKonto(string $stand, string $konto)
    {
        $array = [];
        switch ($konto) {
            case $stand <= 0:
                $konto = \abs($konto);
                $text = "Die Kasse ist leer, Du kannst dir leider nichts nehmen :(";
                return  $array = ['text' => $text,
                                 'max' => $konto,
                                 'show' => 'disabled'];                        
                break;
            case $konto < 0:
                $konto = \abs($konto);
                $text = "Du musst <b>{$konto}&#8364;</b> einzahlen!";
                return  $array = ['text' => $text,
                                 'max' => $konto,
                                 'show' => ''];
                break;
            case $konto > $stand:
                $rest = $konto - $stand;
                $text = "Aktuell kannst Du max. <b>{$stand}&#8364;</b> aus der Kasse nehmen. <b>
                {$rest}&#8364;</b> verbleiben auf deinem persönlichen Konto.";
                return  $array = ['text' => $text, 
                                 'max' => $stand,
                                 'show' => ''];  
                break;            
            default:
                $text = "Du kannst dir <b>{$konto}&#8364;</b> aus der Kasse nehmen";
                return $array = ['text' => $text, 
                                 'max' => $konto,
                                 'show' => '']; 
                break;
        }
    } 
}