<?php
/**  (c) Thomas Böhme **/

//  allg. stehen in Model\Resource die anbindungen an externe System z.B. Datenbanken, APIs, Warenwirtschaftssysteme etc.

namespace Model\Resource;

class Base
{
/*     public function __construct($file = 'my_setting.ini')
    {
        if (!$settings = parse_ini_file($file, TRUE)) throw new exception('Unable to open ' . $file . '.');
       
        $dns = $settings['database']['driver'] .
        ':host=' . $settings['database']['host'] .
        ((!empty($settings['database']['port'])) ? (';port=' . $settings['database']['port']) : '') .
        ';dbname=' . $settings['database']['schema'];
       
        parent::__construct($dns, $settings['database']['username'], $settings['database']['password']);
    } */


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
