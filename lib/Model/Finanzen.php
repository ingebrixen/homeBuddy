<?php
/**  (c) Thomas Böhme **/


namespace Model;

class Finanzen
{
    private $_id        = 0;
    private $_uri       = "";
    private $_stand     = "";
    private $_wer       = "";
    private $_wann      = "";
    private $_wieviel   = "";
    private $_womit     = "";
    private $_privat    = "";
    private $_wo        = "";
    

    public function getId()
    {
        return $this->_id;
    }
    public function setId($id)
    {
        $this->_id = $id;
    }
    public function getUri()
    {
        return $this->_uri;
    }
    public function setUri($uri)
    {
        $this->_uri = $uri;
    }
    public function getStand()
    {
        return $this->_stand;
    }
    public function setStand($stand)
    {
        $this->_stand = $stand;
    }
    public function getWer()
    {
        return $this->_wer;
    }
    public function setWer($wer)
    {
        $this->_wer = $wer;
    }
    public function getWann()
    {
        return $this->_wann;
    }
    public function setWann($wann)
    {
        $this->_wann = $wann;
    }
    public function getWieviel()
    {
        return $this->_wieviel;
    }
    public function setWieviel($wieviel)
    {
        $this->_wieviel = $wieviel;
    }
    public function getWomit()
    {
        return $this->_womit;
    }
    public function setWomit($womit)
    {
        $this->_womit = $womit;
    } 
    public function getPrivat()
    {
        return $this->_privat;
    }
    public function setPrivat($privat)
    {
        $this->_privat = $privat;
    }
    public function getWo()
    {
        return $this->_wo;
    }
    public function setWo($wo)
    {
        $this->_wo = $wo;
    }

}