<?php


namespace Model\Resource;

class Settler extends Base
{
    public function getHaushaltsbuch(string $monat) //z.B. sortierung, anzahl einträge 
    {
        $connection = $this->connect();
        
        $sql = sprintf(
            "SELECT * FROM haushaltskasse WHERE MONTH(wann) = $monat",
            );

        $dbResult = $connection->query($sql);

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $kasse = \App::getModel('Settler');
            $kasse->setWer($row['wer']);
            $kasse->setWann($row['wann']);
            $kasse->setWieviel($row['wieviel']);
            return $kasse;
        }

        return false;
    }
    public function addMoney(string $dbname, string $inorout, string $wer, string $wann, string $wieviel, string $womit, string $privat, string $wo)
    {
        $sql = "INSERT INTO $dbname (inorout, wer, wann, wieviel, womit, privat, wo) VALUES (:inorout, :wer, :wann, :wieviel, :womit, :privat, :wo)";

        $date = date('Y-m-d', strtotime($wann));

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

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