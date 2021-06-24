<?php
/**  (c) Thomas Böhme **/



namespace View;

class Template
{
    protected $_tmplFile = "0";

    public function __construct(string $tmplFile)
    {
        $this->_tmplFile = $tmplFile;
        //  tempFile ist der übergebene Dateiname aus der Controller/Index
    }
    public function renderTemplate(array $data)
        //  $data das Daten array aus der Controller/Index
    {
        extract($data);
        //  Diese Funktion wird verwendet, um Variablen eines Arrays in die aktuelle Symboltabelle zu importieren.

        ob_start();
        //  Diese Funktion aktiviert die Ausgabepufferung. Während die Ausgabepufferung aktiv ist, werden Skriptausgaben
        //  (mit Ausnahme von Headerinformationen) nicht direkt an den Client weitergegeben, sondern in einem internen Puffer gesammelt.
        require_once BASEPATH . '/template/' . $this->_tmplFile;
        //  hier wird auf den in der Controller Index verwiesene Dateiname ausgegeben.
        //  von der index.php aus BasePath/template/bilder.phtml
        $htmlResponse = \ob_get_contents();
        
        \ob_end_clean();
        /*  Der Inhalt dieses internen Puffers kann mit Hilfe der Funktion ob_get_contents() in eine Zeichenketten-Variable kopiert werden.
        Um auszugeben, was im internen Puffer gespeichert ist, ist ob_end_flush() zu verwenden. Alternativ wird mit ob_end_clean()
        der Puffer stillschweigend verworfen.
        */
        //  var_dump($htmlResponse);
        return $htmlResponse;
    }
}
