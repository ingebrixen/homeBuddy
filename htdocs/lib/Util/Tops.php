<?php

namespace Util;


class Tops
{
    //	ausgabe der Finanzdaten im Kopfbereich jeder Seite

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
        $_table = 'haushaltskasse';
        $_colum = 'stand';

        $query = 'SELECT '.$_colum.' FROM '.$_table.' ORDER BY ID DESC LIMIT 1';

        $resourceModel = \App::getResourceModel('DBHandler');
        $dataSet = $resourceModel->selectTops($_model, $query);

        return $dataSet;
    }
}