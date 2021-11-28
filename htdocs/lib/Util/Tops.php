<?php


namespace Util;

use Model\Finanzen;
use Model\Resource\DBHandler;


class Tops
{

    public static function getTopAusgaben()
    {
        $_model = 'Finanzen';
        $_table = 'sumAusg';
        $_colum = 'wer, sumAusgaben';
        $query = 'SELECT '.$_colum.' FROM '.$_table;
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function getTopKonto(string $userId)
    {
        $_model = 'Finanzen';
        $_table = 'persKonto';
        $_colum = 'konto, lend';
        $query = 'SELECT '.$_colum.' FROM '.$_table.' WHERE id = '.$userId;
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function getTopStand() 
    {
        $_model = 'Finanzen';
        $_table = 'sumStand';
        $_colum = 'Stand';
        $query = 'SELECT '.$_colum.' FROM '.$_table;
        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);
        
        return $dataSet;
    }
    public static function calKonto(string $stand, string $konto)
    {
        $array = [];
        switch ($konto) {
            case $konto < 0:
                $konto = \abs($konto); 
                $text = "Du musst <b>{$konto}&#8364;</b> einzahlen!";
                return  $array = ['text' => $text,
                                 'max' => $konto,
                                 'val' => $konto,
                                 'show' => ''];
                break;
            case $konto == 0:
                $konto = \abs($konto);
                $text = "Dein Kontostand ist ausgegelichen, Geld leihen?";
                return  $array = ['text' => $text,
                                 'max' => $stand,
                                 'val' => '',
                                 'show' => ''];                        
                break;
            default:
                $text = "Du kannst dir <b>{$konto}&#8364;</b> aus der Kasse nehmen";
                return $array = ['text' => $text, 
                                 'max' => $konto,
                                 'val' => $konto,
                                 'show' => '']; 
                break;
        }
    } 
}