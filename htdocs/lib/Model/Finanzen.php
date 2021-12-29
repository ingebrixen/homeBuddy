<?php


namespace Model;

class Finanzen
{

    use ExchangeArray;

    private $_id            = 0;
    private $_num           = "";
    private $_uid           = "";
    private $_stand         = "";
    private $_wer           = "";
    private $_datum         = "";
    private $_wieviel       = "";
    private $_womit         = "";
    private $_wo            = "";
    private $_kategorie     = "";
    private $_kommentar     = "";
    private $_sumAusgaben   = "";
    private $_konto         = "";
    private $_lend          = "";
    private $_sumKat        = "";
    private $_monat         = "";
    private $_summe          = "";

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
    public function getNum()
    {
        return $this->_num;
    }
    public function setNum($num)
    {
        $this->_num = $num;
    }
    public function getUid()
    {
        return $this->_uid;
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
    public function getSumAusgaben()
    {
        return $this->_sumAusgaben;
    }
    public function setSumAusgaben($sumAusgaben)
    {
        $this->_sumAusgaben = $sumAusgaben;
    }    
    public function getKonto()
    {
        return $this->_konto;
    }
    public function setKonto($konto)
    {
        $this->_konto = $konto;
    }
    public function getLend()
    {
        return $this->_lend;
    }
    public function setLend($lend)
    {
        $this->_lend = $lend;
    }
    
    public function getSumKat()
    {
        return $this->_sumKat;
    }
    public function setSumKat($sumKat)
    {
        $this->_sumKat = $sumKat;
    }
    public function getMonat()
    {
        return $this->_monat;
    }
    public function setMonat($monat)
    {
        $this->_monat = $monat;
    }
    public function getSumme()
    {
        return $this->_summe;
    }
    public function setSumme($summe)
    {
        $this->_summe = $summe;
    }
}