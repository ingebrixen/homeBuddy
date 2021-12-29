<?php


//  allg. stehen in Model\Resource die anbindungen an externe System z.B. Datenbanken, APIs, Warenwirtschaftssysteme etc.

namespace Model\Resource;

class Base
{
    private $dbuser = DBUSER;
    private $dbpass = DBPWD;
    private $dbname = DBNAME;
    private $dbhost = DBHOST;


    protected function connect()
    {
        
        $dataSource = "mysql:host=$this->dbhost;dbname=$this->dbname";
        $pdo = new \PDO($dataSource, $this->dbuser, $this->dbpass);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        return $pdo;

    }
}
