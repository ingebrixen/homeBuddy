<?php

declare(strict_types=1);

namespace Model\Resource;

class DBHandler extends Base
{    
    //private $_order = "";

    public function selectData(string $model, string $table, string $colum, array $params = [], $order = '', int $offset = 0, int $limit = 10) 
    //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $sql = \sprintf("SELECT %s FROM %s %s %s %s", 
        $colum, 
        $table, 
        $this->_setWhere($params),
        $order,
        $this->_getLimit($offset, $limit));

        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 
        $this->connection = null;
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
        $this->connection = null;
        return $connection->lastInsertId();
        
    }
    public function updateData(string $table, string $colum, string $upVar, string $id)
    {
        $sql = \sprintf("UPDATE %s SET %s = %s WHERE id = %s",
        $table, $colum, $upVar, $id);

        $connection = $this->connect();
        $update = $connection->prepare($sql);

        $update->execute();
        
        $this->connection = null;
        return $connection->lastInsertId();
    }
    public function deleteData(string $table, string $id)
    {

    }
    public function selectTops(string $model, string $sql)
    {
        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $this->_dataSetter($set, $model);
    }
    public function countItems(string $table, array $params = [] ):int
    {
        //  gibt die Anzahl der DB Items als Int zurück
        $sql = \sprintf("SELECT COUNT(*) FROM %s %s", 
        $table,
        $this->_setWhere($params) 
        );
        
        $dbResult = $this->connect()->query($sql);
        $totalItems = implode($dbResult->fetch(\PDO::FETCH_ASSOC));

        return intval($totalItems);
    }
    /* public function selectKonto(string $model, string $sql):array
    {
        $dbResult = $this->connect()->query($sql);
        for ($set = array(); $row = $dbResult->fetch(\PDO::FETCH_ASSOC); $set[] = $row); 

        return $set;
    } */
    private function _getLimit(int $offset, int $limit):string
    {
        if (isset($offset)) {

            return "LIMIT {$offset}, {$limit}";

        }    
    }
    private function _setWhere(array $params):string
    {
        // params Array Key als colum und Value als suchabfrage
        // params[datum] => params[2021-08]

        if (!empty($params)) {
            $key = array_keys($params);
            $colum = $key[0];
            $value = $params[$colum];
            return "WHERE {$colum} LIKE '{$value}%'";
        }
            return "";
    }
    private function _dataSetter(array $_set, string $model):array
    {
        //  erzeugt $data->setId($row['id']);
        $_dataSet = array(); 
        foreach ($_set as $array){          
                $data = \App::getModel($model, $array);
                $_dataSet[] = $data;
        }
        return $_dataSet;
    }
    private function _createBindValue(array $post):array
    {
        //  erzeugt 
        $keys = array_keys($post);
        foreach($keys as $value) {
            $value = ":".$value;
        }
        $arryComb = array_combine($keys, $post);

        return $arryComb;
    }
    private function _getColum(array $post):string
    {
        $keys = array_keys($post);
        $col = \implode(', ', $keys);

        return $col;
    }
    private function _getValue(array $post):string
    {
        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $val = \implode(', ', $keys);

        return $val;
    }
    private function _setOrder(string $order):string
    {
        if (isset($order)) {
            return "ORDER BY $order";
        }        
    }
    private function _sort()
    {

    }
}