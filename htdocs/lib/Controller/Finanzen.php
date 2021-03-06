<?php

declare(strict_types=1);

namespace Controller;

#require '../vendor/autoload.php';

use Util\Paginator;
use Util\Dispatcher;
class Finanzen extends Base {

    private string $_table;
    private string $_model = "Finanzen";
    
    public function __construct()
    {
        $this->_checkLogin();        
    }
    public function indexAction($params)
    {
        $_table = "sumByKat";
        $_colum = "kategorie, sumKat";

        $model = \App::getResourceModel('DBHandler');
        $sumByKat = $model->selectData($this->_model, $_table, $_colum, $params);

        $_table = "sumMonth";
        $_colum = "Monat, Summe";

        $sumMonth = $model->selectData($this->_model, $_table, $_colum, $params);

        echo $this->render('dashboard.phtml', array('sumByKat' => $sumByKat, 'sumMonth' => $sumMonth));
    }
    public function haushaltskasseAction($params) 
    {    
        $this->_table = "haushaltskasse";

        $model = \App::getResourceModel('DBHandler');
        if (empty($params['datum'])) {
            $params = ["datum" => date('Y-m')];            // standard definiere, wenn kein filter angegeben ist, wird immer der aktuelle Monat ausgegeben.
        }
        $_colum = "id, num, wer, datum, wieviel, stand, womit";
        $_order = "ORDER BY ID DESC";

        $paginator = new Paginator($this->_table, $params);
        $_offset = $paginator->getOffset();
        $_limit = intval($paginator->getLimit());

        $data = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order, $_offset, $_limit);

        if ($this->isPost()) 
        {
            if (isset($_POST['wForm'])) {
                if ((new Dispatcher($_POST))) {
                $url = \App::getBaseUrl() . '/finanzen/haushaltskasse';
                header('Location: ' . $url); 
                }
            }            
        }
        echo $this->render('haushaltskasse.phtml', array('dataSet' => $data, 'paginator' => $paginator));       
    }
    public function ausgabenAction($params)
    {
        $this->_table = "ausgaben";

        $_colum = "id, datum, wer, wo, kategorie, wieviel, kommentar";        
        $_order = "ORDER BY ID DESC";


        $paginator = new Paginator($this->_table, $params);
        $_offset = $paginator->getOffset();
        $_limit = intval($paginator->getLimit());

        $model = \App::getResourceModel('DBHandler');
        $data = $model->selectData($this->_model, $this->_table, $_colum, $params, $_order, $_offset, $_limit);

        if ($this->isPost()) 
        {
            /** @var \Model\Resource\DBHandler $getResource */
            $getResource = \App::getResourceModel('DBHandler');

            if (!isset($_POST['itemLimit'])) {
                if ($getResource->insertData($this->_table, $_POST)) {                
                    $url = \App::getBaseUrl() . '/finanzen/ausgaben';
                    header('Location: ' . $url);                 
                }
            }            
        } 
        echo $this->render('ausgaben.phtml', array('dataSet' => $data, 'paginator' => $paginator));
    }
    public function fredericoAction($params)
    {
        echo $this->render('dashboard.phtml', array());
    }

}
