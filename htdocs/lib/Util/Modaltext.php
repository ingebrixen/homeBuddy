<?php


namespace Util;

class Modaltext {

        static function calKonto(string $stand, string $konto)
        {
            $array = [];
            switch ($konto) {
                case $konto < 0:
                    $konto = \abs($konto); 
                    $text = "Du musst <b>{$konto}&#8364;</b> einzahlen!";
                    return  $array = ['text' => $text,
                                     'max' => '',
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