<?php

declare(strict_types=1);

namespace Model\Resource;

class DBHandler extends Base
{    
    public function selectData(string $uri, string $table, string $colum, array $params) //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $sql = \sprintf("SELECT %s FROM %s %s ORDER BY ID DESC", $colum, $table, $this->_setWhere($params));
        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 
        return $this->_dataSetter($set, $uri);
    }
    public function insertData(string $uri, array $post)
    {
        $sql = \sprintf("INSERT INTO %s (%s) VALUES (%s)", 
        $this->_getTableName($uri), 
        $this->_getColum($post), 
        $this->_getValue($post));
        
        $connection = $this->connect();
        $statement = $connection->prepare($sql);
        foreach ($this->_createBindValue($post) as $key => &$val) {
            $statement->bindValue($key, $val);
        }
        $statement->execute();

        return $connection->lastInsertId();
    }
    public function selectTopAusgaben(string $uri)
    {
        $sql = "SELECT wer, sum(wieviel) AS sumWieviel FROM ausgaben GROUP BY wer";
        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 
        return $this->_dataSetter($set, $uri);
    }
    public function selectTopKasse(string $uri)
    {
        $sql = "SELECT wer, sum(wieviel) AS sumWieviel FROM ausgaben GROUP BY wer";
        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 
        return $this->_dataSetter($set, $uri);
    }
    private function _dataSetter(array $_set, string $uri)
    {
        //$data->setId($row['id']);
        $_dataSet = array(); 
        foreach ($_set as $array){          
                $data = \App::getModel($this->_setModelName($uri), $array);
                $_dataSet[] = $data;
        }
        return $_dataSet;
    }
    private function _setModelName(string $modelUri)
    {
        $model = \explode("/", $modelUri);
        $modelName = ucfirst($model[1]);
        return $modelName;
    }
    private function _createBindValue(array $post)
    {
        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $arryComb = array_combine($keys, $post);
        return $arryComb;
    }
    private function _sort()
    {

    }
    private function _getTableName(string $uriString)
    {
        $dbTable = \explode("/", $uriString);
        $tableName = $dbTable[2];
        return $tableName;
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
        } /* else {
            return " ";
        } */
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
}