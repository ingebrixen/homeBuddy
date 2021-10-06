<?php


namespace Model\Resource;

class DBHandler extends Base
{    
    public function selectData($uri, $colum, $params) //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $sql = \sprintf("SELECT %s FROM %s %s ORDER BY ID DESC", $colum, self::getTableName($uri), self::setWhere($params));
        $dbResult = $this->connect()->query($sql);
         
        $_dataSet = array();
        // dbresult array muss hier weiterverarbeitet werden und dann im Finanzen Controller verarbeitet werden 
        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $data = \App::getModel('Finanzen');
            $data->setId($row['id']);
            $data->setWer($row['wer']);
            $data->setWann($row['datum']);
            $data->setWieviel($row['wieviel']);
            $data->setStand($row['stand']);
            
            $_dataSet[] = $data;
        }
        return $_dataSet;
        /* return $dbResult; */
    }
    public function insertData($uri, array $post)
    {
        $sql = \sprintf("INSERT INTO %s (%s) VALUES (%s)", self::getTableName($uri), self::getColum($post), self::getValue($post));
        $connection = $this->connect();
        $statement = $connection->prepare($sql);
        //neue methode createBindValue
/*         $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $arryComb = array_combine($keys, $post); */
        //methode bis hier
        foreach (self::createBindValue($post) as $key => &$val) {
            $statement->bindValue($key, $val);
        }
        $statement->execute();

        return $connection->lastInsertId();
    }
    public function getTopAusgaben()
    {
        $sql = "SELECT wer, sum(wieviel) AS sumWieviel FROM ausgaben GROUP BY wer";
        $dbResult = $this->connect()->query($sql);
        $_dataSet = array();
          // dbresult array muss hier weiterverarbeitet werden und dann im Finanzen Controller verarbeitet werden 
          while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $data = \App::getModel('Finanzen');
            $data->setWer($row['wer']);
            $data->setSumWieviel($row['sumWieviel']);
            
            $_dataSet[] = $data;
        }
        return $_dataSet;

    }
    private function createBindValue($post)
    {
        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $arryComb = array_combine($keys, $post);
        return $arryComb;
    }
    private function sort()
    {

    }
    private function getTableName($uriString)
    {
        $dbTable = \explode("/", $uriString);
        $tableName = $dbTable[2];
        return $tableName;
    }
    private function setWhere(array $params)
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
    private function getColum(array $post)        
    {
        $keys = array_keys($post);
        $col = \implode(', ', $keys);
        return $col;
    }
    private function getValue(array $post)        
    {
        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $val = \implode(', ', $keys);
        return $val;

    }
}