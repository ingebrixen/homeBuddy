<?php


namespace Model\Resource;

class DBHandler extends Base
{
    
    private function getTableName($uri)
    {
        $dbTable = \explode("/", $uri);
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
    private function sort()
    {

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
    public function selectData($uri, $colum, $params) //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $sql = \sprintf("SELECT %s FROM %s %s ORDER BY ID DESC", $colum, self::getTableName($uri), self::setWhere($params));
        $dbResult = $this->connect()->query($sql);

        $dataSet = array();
        // dbresult array muss hier weiterverarbeitet werden und dann im Finanzen Controller verarbeitet werden 
        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $data = \App::getModel('Finanzen');
            $data->setId($row['id']);
            $data->setWer($row['wer']);
            $data->setWann($row['datum']);
            $data->setWieviel($row['wieviel']);
            $data->setStand($row['stand']);
            
            $dataSet[] = $data;
        }
        return $dataSet;
        /* return $dbResult; */
    }
    //public function addData(string $wer, string $uri, string $inorout, string $wann, string $wieviel, string $womit, string $privat, string $wo)
    public function addData($uri, array $post)
    {
        /* $date = date('Y-m-d', strtotime($post['wann'])); */        
        //$table = self::getTableName($uri);

        //$sql = \sprintf("INSERT INTO %s (%s) VALUES (%s)",self::getTableName($uri), self::getColum($post), self::getValue($post));
        //$sql = "INSERT INTO $table (wer, datum, wieviel, womit, privat, wo) VALUES (:wer, :wann, :wieviel, :womit, :privat, :wo)";
        //$sql = \sprintf("INSERT INTO %s (wer, datum, wieviel, womit, privat, wo) VALUES (:wer, :wann, :wieviel, :womit, :privat, :wo)",self::getTableName($uri)); good
        //$sql = \sprintf("INSERT INTO %s (%S) VALUES (:wer, :wann, :wieviel, :womit, :privat, :wo)", self::getTableName($uri), self::getColum($post));
        $sql = \sprintf("INSERT INTO %s (%s) VALUES (%s)", self::getTableName($uri), self::getColum($post), self::getValue($post));
        $connection = $this->connect();
        $statement = $connection->prepare($sql);

        $keys = array_keys($post);
        foreach($keys as &$value) {
            $value = ":".$value;
        }
        $erg = array_combine($keys, $post);
        foreach ($erg as $key => &$val) {
            $statement->bindValue($key, $val);
            //array vorher ändern ":key => val"
        }
        
/*       array(6) { ["wer"]=> string(6) "Thomas" ["wann"]=> string(10) "2021-09-29" ["wieviel"]=> string(3) "-14" ["womit"]=> string(4) "self" ["privat"]=> string(0) "" ["wo"]=> string(0) "" } 
        //$_POST =    ["wer"=> "Thomas", "wann"=>  "2021-09-29", "wieviel"=> "-45", "womit"=> "self", "privat"=> "1", "wo"=> "test" ];
        $statement->bindValue(':wer', $wer);
        $statement->bindValue(':wann', $date);
        $statement->bindValue(':wieviel', $inorout.$wieviel);
        $statement->bindValue(':womit', $womit);
        $statement->bindValue(':privat', $privat);
        $statement->bindValue(':wo', $wo); */

        $statement->execute();

        return $connection->lastInsertId();
    }
}