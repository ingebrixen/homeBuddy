<?php

declare(strict_types=1);

namespace Model\Resource;

class DBHandler extends Base
{    
    //private $_order = "";

    public function selectData(string $model, string $table, string $colum, array $params) 
    //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $sql = \sprintf("SELECT %s FROM %s %s ORDER BY id DESC", 
        $colum, 
        $table, 
        $this->_setWhere($params));

        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $this->_dataSetter($set, $model);
    }
    public function insertData(string $table, array $post)
    {
        $sql = \sprintf("INSERT INTO %s (%s) VALUES (%s)", 
        $table, 
        $this->_getColum($post), 
        $this->_getValue($post));
        
        $connection = $this->connect();
        $statement = $connection->prepare($sql);
        foreach ($this->_createBindValue($post) as $key => $val) {
            $statement->bindValue($key, $val);
        }
        $statement->execute();

        return $connection->lastInsertId();
    }
    public function updateData(string $table, array $post)
    {
        $id = $post['id]'];
        unset($post['id']);
        $sql = \sprintf("UPDATE %s SET %s=%s WHERE id = %s",
        $table, $this->_getColum($post), $this->_getValue($post), $id
    );
    }
    public function selectTopAusgaben(string $model)
    {
        $sql = "SELECT wer, sum(wieviel) AS sumWieviel FROM ausgaben GROUP BY wer";

        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $this->_dataSetter($set, $model);
    }
    public function selectTopKonto(string $model, string $userId)
    {
        $sql = "SELECT konto FROM persKonto WHERE userId = $userId";

        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $this->_dataSetter($set, $model);
    }
    public function selectTopStand(string $model)
    {
        $sql = "SELECT stand FROM haushaltskasse ORDER BY ID DESC LIMIT 1";

        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $this->_dataSetter($set, $model);
    }


    private function _dataSetter(array $_set, string $model)
    {
        //$data->setId($row['id']);
        $_dataSet = array(); 
        foreach ($_set as $array){          
                $data = \App::getModel($model, $array);
                $_dataSet[] = $data;
        }
        return $_dataSet;
    }
    private function _createBindValue(array $post)
    {
        $keys = array_keys($post);
        foreach($keys as $value) {
            $value = ":".$value;
        }
        $arryComb = array_combine($keys, $post);

        return $arryComb;
    }
    private function _sort()
    {

    }
    private function _setWhere(array $params)
    {
        // params Array Key als colum und Value als suchabfrage
        // params[datum] => params[2021-08]

        if (!empty($params)) {
            $key = array_keys($params);
            $colum = $key[0];
            $value = $params[$colum];
            return "WHERE ".$colum." LIKE '".$value."%'";
        } else {
            return "";
        }
    }
    private function _getColum(array $post)        
    {
        $keys = array_keys($post);
        $col = \implode(', ', $keys);

        return $col;
    }
    private function _getValue(array $post)        
    {
        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $val = \implode(', ', $keys);

        return $val;
    }
    private function _setOrder($order)
    {
        if (isset($order)) {
            return "ORDER BY $order";
        }        
    }
}