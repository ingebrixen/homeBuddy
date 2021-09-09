<?php
/**  (c) Thomas Böhme **/


namespace Model;

class Settler
{
    private $_id = 0;
    private $_dbname ="";
    private $_inorout = "";
    private $_wer = "";
    private $_wann = "";
    private $_wieviel = "";
    private $_womit = "";
    private $_privat = "";
    private $_wo = "";
    
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
     * @return int
     */
    public function getDbName()
    {
        return $this->_dbname;
    }
    /**
     * @param int $id
     */
    public function setDbName($dbname)
    {
        $this->_dbname = $dbname;
    }
    /**
     * @return string
     */
    public function getInOrOut()
    {
        return $this->_inorout;
    }
    /**
     * @param string $inorout
     */
    public function setInOrOut($inorout)
    {
        $this->_inorout = $inorout;
    }
    /**
     * @return string
     */
    public function getWer()
    {
        return $this->_wer;
    }
    /**
     * @param string $wer
     */
    public function setWer($wer)
    {
        $this->_wer = $wer;
    }
    /**
     * @return string
     */
    public function getWann()
    {
        return $this->_wann;
    }
    /**
     * @param string $wann
     */
    public function setWann($wann)
    {
        $this->_wann = $wann;
    }
    /**
     * @return string
     */
    public function getWieviel()
    {
        return $this->_wieviel;
    }
    /**
     * @param string $wieviel
     */
    public function setWieviel($wieviel)
    {
        $this->_wieviel = $wieviel;
    }
    /**
     * @return string
     */
    public function getWomit()
    {
        return $this->_womit;
    }
    /**
     * @param string $womit
     */
    public function setWomit($womit)
    {
        $this->_womit = $womit;
    }    
    /**
     * @return string
     */
    public function getPrivat()
    {
        return $this->_privat;
    }
    /**
     * @param string $privat
     */
    public function setPrivat($privat)
    {
        $this->_privat = $privat;
    }
     /**
     * @return string
     */
    public function getWo()
    {
        return $this->_wo;
    }
    /**
     * @param string $wo
     */
    public function setWo($wo)
    {
        $this->_wo = $wo;
    }

}