<?php


namespace Model\Resource;

class Benutzer extends Base
{
    public function authUser(string $email, string $password)
    {
        $connection = $this->connect();
        $pwHash = hash('sha3-512', $password);

        $sql = sprintf(
            "SELECT id, email, name FROM user WHERE email = %s AND password = %s",
            $connection->quote($email),
            $connection->quote($pwHash)
        );

        $dbResult = $connection->query($sql);

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Benutzer $benutzer */
            $benutzer = \App::getModel('Benutzer');
            $benutzer->setEmail($row['email']);
            $benutzer->setId($row['id']);
            $benutzer->setName($row['name']);
            return $benutzer;
        }

        return false;
    }
    public function regUser(string $name, string $email, string $password)
    {
        $sql = "INSERT INTO user (name, email, password) VALUES (:name, :email, :password)";

        $pwHash = hash('sha3-512', $password);

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

        $statement->bindValue(':name', $name);
        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $pwHash);

        $statement->execute();

        return $connection->lastInsertId();
    }
    

}
