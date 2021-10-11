<?php


namespace Model;

class Finanzen
{

    use ExchangeArray;

    private $_id            = 0;
    private $_uri           = "";
    private $_stand         = "";
    private $_wer           = "";
    private $_datum         = "";
    private $_wieviel       = "";
    private $_womit         = "";
    private $_privat        = "";
    private $_wo            = "";
    private $_kategorie     = "";
    private $_kommentar     = "";
    private $_sumWieviel    = "";

    public function __construct(array $data)
    {
        $this->exchangeArray($data);
    }


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
    public function getDatum()
    {
        return $this->_datum;
    }
    public function setDatum($datum)
    {
        $this->_datum = $datum;
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
    public function getKategorie()
    {
        return $this->_kategorie;
    }
    public function setKategorie($kategorie)
    {
        $this->_kategorie = $kategorie;
    }
    public function getKommentar()
    {
        return $this->_kommentar;
    }
    public function setKommentar($kommentar)
    {
        $this->_kommentar = $kommentar;
    }
    public function getSumWieviel()
    {
        return $this->_sumWieivel;
    }
    public function setSumWieviel($sumWieivel)
    {
        $this->_sumWieivel = $sumWieivel;
    }


}