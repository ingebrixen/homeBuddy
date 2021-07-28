<?php


namespace Model\Resource;

class Benutzer extends Base
{
    public function getMoney(string $email, string $password) //z.B. sortierung, anzahl einträge 
    {
        $connection = $this->connect();
        
        $sql = sprintf(
            "SELECT * FROM haushaltskasse",
            );

        $dbResult = $connection->query($sql);

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $benutzer = \App::getModel('Benutzer');
            $benutzer->setEmail($row['email']);
            $benutzer->setId($row['id']);
            $benutzer->setName($row['name']);
            var_dump($benutzer);
            return $benutzer;
        }

        return false;
    }
    public function addMoney(string $email, string $password)
    {
        $sql = "INSERT INTO haushaltskasse (inorout, wer, wann, wieviel, womit, privat, wo) VALUES (:inorout, :wer, :wann, :wieviel, :womit, :privat, :wo)";

        $pwHash = hash('sha3-512', $password);

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $pwHash);

        $statement->execute();

        return $connection->lastInsertId();
    }
    

}