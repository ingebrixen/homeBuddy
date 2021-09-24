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
        // params[Datum] => params[2021-08]

        if (!empty($params)) {
            $key = array_keys($params);
            $colum = $key[0];
            $value = $params[$colum];
            return "WHERE ".$colum." LIKE '".$value."%'";
        } /* else {
            return "";
        } */
    }
    private function sort()
    {

    }
    private function getColum(array $post)        
    {

    }
    public function selectData($uri, $params) //z.B. sortierung, anzahl einträge, standard (z.b. bei sortierung oder datumsfilter)
    {    
        $table = self::getTableName($uri);      
        $where = self::setWhere($params);
        $sql = "SELECT * FROM $table $where ORDER BY ID DESC";

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
    public function addData(string $wer, string $uri, string $inorout, string $wann, string $wieviel, string $womit, string $privat, string $wo)
    {
        $date = date('Y-m-d', strtotime($wann));
        
        $table = self::getTableName($uri);

        $sql = "INSERT INTO $table (wer, datum, wieviel, womit, privat, wo) VALUES (:wer, :wann, :wieviel, :womit, :privat, :wo)";

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

        
        $statement->bindValue(':wer', $wer);
        $statement->bindValue(':wann', $date);
        $statement->bindValue(':wieviel', $inorout.$wieviel);
        $statement->bindValue(':womit', $womit);
        $statement->bindValue(':privat', $privat);
        $statement->bindValue(':wo', $wo);

        $statement->execute();

        return $connection->lastInsertId();
    }
}