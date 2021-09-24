<?php
/**  (c) Thomas Böhme **/

//  allg. stehen in Model\Resource die anbindungen an externe System z.B. Datenbanken, APIs, Warenwirtschaftssysteme etc.

namespace Model\Resource;

class Base
{

    private $dbuser = "homeBuddy_db_user";
    private $dbpass = "T80e,mefgtb";
    private $dbname = "homeBuddy";
    private $dbhost = "localhost";


    protected function connect()
    {
        $dataSource = "mysql:host=$this->dbhost;dbname=$this->dbname";
        return new \PDO($dataSource, $this->dbuser, $this->dbpass);
    }
}
