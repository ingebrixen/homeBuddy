<?php


namespace Model;

/*
Wieso sollte man Get- und Set-Methoden nutzen?
Erstmal sieht der Einsatz der Get- und Set-Methoden unnötig kompliziert aus. Der große Vorteil ist aber, dass ihr den Zugriff zentral in der Klasse kontrollieren könnt.
Angenommen ihr möchtet sicher gehen, dass die $email-Klassenvariable stets eine gültige E-Mail-Adresse enthält. Wenn ihr direkt auf diese Klassenvariable von außen zugreift,
so müsstet ihr euren gesamten Code durchgehen und schauen wo einem User-Objekt eine E-Mail-Adresse zugewiesen wird. Dieses kann bei großen Projekten recht aufwendig sein.
Mittels den Get- und Set-Methoden könnt ihr die Überprüfung zentral bündeln.
 */


class Bild
{
    private $_id = 0;
    private $_name = "";
    private $_path = "";

    /**
     * @return int
     */
    public function getId()
    {
        return $this->_id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->_id = $id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->_name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->_name = $name;
    }

    /**
     * @return string
     */
    public function getPath()
    {
        return $this->_path;
    }

    /**
     * @param string $path
     */
    public function setPath($path)
    {
        $this->_path = $path;
    }
}
