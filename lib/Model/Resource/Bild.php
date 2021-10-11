<?php


namespace Model\Resource;

//  in der Model\Bild (alias BildModel) sind die geter und seter für die Bildvariablen.


class Bild extends Base
//  Child Klasse von Base in der die allg Verbindungsmethode "connect" steht.
{
    public function getBilder()
    {
        $sql = 'SELECT id, name, path FROM bilder';

        $dbResult = $this->connect()->query($sql);
        //  instanz von connect -> PDO Objekt query($sql)

        $bilder = array();

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            //  PDOStatement::fetch returns a row from the result set. The parameter PDO::FETCH_ASSOC tells PDO to return the result as an associative array.
            //  The array keys will match your database column names. If the table contains columns 'id' and 'name' and 'path, the array will be structured like:
            //\var_dump($row);
            //  array(3) { ["id"]=> string(1) "1" ["name"]=> string(8) "test.png" ["path"]=> string(8) "test.png" }
            //  für jede gefundene Datenbankzeile wird ein neues Objekt erzeugt und an das Array $bilder angehangen.
            //  an das template übergeben wird.
            /** @var \Model\Bild $bild */
            $bild = \App::getModel('Bild');
            $bild->setId($row['id']);
            $bild->setName($row['name']);
            $bild->setPath($row['path']);
            
            $bilder[] = $bild;
            //var_dump($bild);
            //  object(Model\Bild)#6 (3) { ["_id":"Model\Bild":private]=> string(1) "1" ["_name":"Model\Bild":private]=> string(8) "test.png" ["_path":"Model\Bild":private]=> string(8) "test.png" }
        }
        return $bilder;
        //\var_dump($bilder);
        //  array(1) { [0]=> object(Model\Bild)#6 (3) { ["_id":"Model\Bild":private]=> string(1) "1" ["_name":"Model\Bild":private]=> string(8) "test.png" ["_path":"Model\Bild":private]=> string(8) "test.png" } }
    }
    public function getBild(int $imgId)
    {
        $sql = \sprintf('SELECT id, name, path FROM bilder WHERE id = %d', $imgId);
        $dbResult = $this->connect()->query($sql);

        while ($row = $dbResult->fetch(\PDO::FETCH_ASSOC)) {
            /** @var \Model\Bild $bild */
            $bild = \App::getModel('Bild');
            $bild->setId($row['id']);
            $bild->setName($row['name']);
            $bild->setPath($row['path']);

            return $bild;
        }
        return false;
    }
    public function insertImg(\Model\Bild $bild)
    {
        $sql = "INSERT INTO bilder (name, path) VALUES (:name, :path)";

        $connection = $this->connect();
        $statement = $connection->prepare($sql);

        $statement->bindValue(':name', $bild->getName());
        $statement->bindValue(':path', $bild->getPath());

        $statement->execute();

        return $connection->lastInsertId();
    }
}
