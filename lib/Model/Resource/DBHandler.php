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
        $sql = "SELECT id, wer, Datum, wieviel, stand FROM $table $where ORDER BY ID DESC";

        $dbResult = $this->connect()->query($sql);

        $listKasse = array();

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $kasse = \App::getModel('Finanzen');
            $kasse->setId($row['id']);
            $kasse->setWer($row['wer']);
            $kasse->setWann($row['Datum']);
            $kasse->setWieviel($row['wieviel']);
            $kasse->setStand($row['stand']);
            
            $listKasse[] = $kasse;
        }
        return $listKasse;
    }
    public function addData(string $wer, string $uri, string $inorout, string $wann, string $wieviel, string $womit, string $privat, string $wo)
    {
        $date = date('Y-m-d', strtotime($wann));
        
        $table = self::getTableName($uri);

        $sql = "INSERT INTO $table (wer, Datum, wieviel, womit, privat, wo) VALUES (:wer, :wann, :wieviel, :womit, :privat, :wo)";

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