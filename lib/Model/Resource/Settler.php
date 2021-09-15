<?php


namespace Model\Resource;

class Settler extends Base
{
    public function getHaushaltsbuch() //z.B. sortierung, anzahl einträge 
    {               
        $sql = "SELECT id, wer, wann, wieviel FROM haushaltskasse ORDER BY ID DESC";

        $dbResult = $this->connect()->query($sql);

        $listKasse = array();

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $kasse = \App::getModel('Settler');
            $kasse->setId($row['id']);
            $kasse->setWer($row['wer']);
            $kasse->setWann($row['wann']);
            $kasse->setWieviel($row['wieviel']);
            
            $listKasse[] = $kasse;
        }

        return $listKasse;
    }
    public function addMoney(string $wer, string $uri, string $inorout, string $wann, string $wieviel, string $womit, string $privat, string $wo)
    {
        $date = date('Y-m-d', strtotime($wann));
        $dbTable = \explode("/", $uri);
        $tableName = /* $dbTable[2] */ 'haushaltskasse';
        

        $sql = "INSERT INTO haushaltskasse (inorout, wer, wann, wieviel, womit, privat, wo) VALUES (:inorout, :wer, :wann, :wieviel, :womit, :privat, :wo)";

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

/*         $statement->bindValue(':tableName', $tableName); */
        $statement->bindValue(':inorout', $inorout);
        $statement->bindValue(':wer', $wer);
        $statement->bindValue(':wann', $date);
        $statement->bindValue(':wieviel', $wieviel);
        $statement->bindValue(':womit', $womit);
        $statement->bindValue(':privat', $privat);
        $statement->bindValue(':wo', $wo);

        $statement->execute();

        return $connection->lastInsertId();
    }

    public function getStand()
    {

    }

}