<?php
/**  (c) Thomas Böhme **/


class Bootstrap
{

    //  /upload => upload   Controller ist hier die URL
    private $_controller = "";

    //  /upload/save => save  Action ist die Anweisung nach der "URL", hier "save"
    private $_action = "";

    //  /image/delete/id/1 => id/1   Parameter sind hier die werte nach der Action, hier ID z.B. 1
    private $_params = array();


    public function __construct()
    {
        $this->_parseRequest();
    }
    private function _parseRequest()
    {
        $path = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
        // Mit parse_url PHP_URL_PATH wird alles was durch / getrennt wird zerlegt und in einem Array ausgegeben.
        // mit trim wird der letzte / weggekürzt
        // $_SERVER ist ein Array, das Informationen wie Header, Pfade und die verschiedenen Wege, das Skript anzusprechen beinhaltet.
        // >'REQUEST_URI'  Der URI, der angegeben wurde, um auf die aktuelle Seite zuzugreifen, beispielsweise '/index.html'.
        /*  Beispiel:
        * http://localhost:3000/index/view/id/1/filter/name
        * liefert hier: index/view/id/1/filter/name
        */
        //echo var_dump($path);
        
        @list($controller, $action, $params) = explode('/', $path, 3);
        // list weißt den variablen $controller, $action, $params Daten des Arrays $path zu, dabei ist / der seperator und 3 das Limit
        // /index/view/id/1/filter/name
        // $controller = index; $action = view; $params = id/1/filter/name
        // Ausgabe: array(3) { [0]=> string(5) "index" [1]=> string(4) "view" [2]=> string(16) "id/1/filter/name" }
        // das @-Zeichen unterdrückt eventuelle Fehler beim fehlen der Parameter

        //echo var_dump($test);

        $controller = (strlen($controller) > 0) ? $controller : 'index';
        $this->setController($controller);
        //  Hier wird überprüft ob ein controller vorhanden ist.
        //  wenn $controller > 0 ist dann ist $controller = $controller ansonsten ist $controller = 'index'
        //  Bei erstaufruf der Seite ist der kontroller leer, also strlen = 0 > der $controller wird auf index gesetzt.
        
        
        //  action?
        //  Wenn keine action vorhanden ist wird per default die action auf index gesetzt
        // erstaufruf sieht also immer so aus:
        //  http://localhost/ => http://localhost/index/index
        $action = (strlen($action) > 0) ? $action : 'index';
        $this->setAction($action);

        //  parameter?
        if (isset($params)) {
            $this->setParams($params);
        }
    }
    private function setController($controller)
    {
        //  Hier wird die Klasse bestimmt
        //  Controller\Upload
        //  Namespace Controller Klasse Upload
        $ctrl = sprintf("\\Controller\\%s", ucfirst(strtolower($controller)));
        //var_dump($ctrl);
        if (!class_exists($ctrl)) {
            throw new InvalidArgumentException(
                "Controller unbekannt: $ctrl"
            );
        }
        $this->_controller = $ctrl;
    }
    private function setAction($action)
    {
        //  TODO: welche Methode in Klasse xyz?
        //  Controller\Upload::saveAction()
        //  Methode save > saveAction
        //  /upload/save/
        $actionMethod = sprintf("%sAction", strtolower($action));
        //  hier wird hinter die Methode save noch Action mit sprintf formatiert um z.B. die Methode saveAction zu erhalten
        //  beim erstaufruf der Seite steht hier indexAction
        //  strtolower damit der übergebene parameter auch wirklich index und nicht Index heißt und somit die methode nicht aufgerufen werden kann.
        //var_dump($actionMethod);
        $reflection = new ReflectionClass($this->_controller);
        //  The ReflectionClass class reports information about a class.
        //  hier werden informationen über die Klasse in $reflection gespeichert
        //  und mit hasMethod überprüft ob in der durch ReflectionClass überprüften Klasse die Methode $actionMethod enthält
        //  hasMethod > ReflectionClass::hasMethod — Checks if method is defined
        //  var_dump($reflection);
        if (!$reflection->hasMethod($actionMethod)) {
            //  Wenn die Methode nicht vorhanden ist wird der Fehler ausgeworfen, ansonsten die Methode z.B. saveAction gesetzt.
            throw new InvalidArgumentException(
                "$this->_controller hat keine Action $action"
            );
        }
        //var_dump($actionMethod);
        $this->_action = $actionMethod;
    }
    private function setParams($params)
    {
        // /index/view/id/1/filter/name
        //  params: id => 1, filter => name
        $splitted = explode('/', $params);
        //  mit explode werden wieder alle parameter geteilt, diesmal ohne limitierung
        //  $splitted ergibt dann ein assoziatives Array (Array mit definierten indizes)
        //var_dump($splitted);
        //  id/1/filter/name sieht dann so aus id, 1, filter, name

        if (count($splitted) % 2 > 0) {
            throw new InvalidArgumentException("Parameteranzahl ungültig");
        }
        //  da die Parameter immer als Paar auftreten müssen, wird hier $splittet gezählt und durch zwei "Modulo" geteilt.
        //  bleibt hier ein Rest über ist die Anzahl falsch und der Fehler wird angezeigt
        
        $paramArray = array();
        $lastIndex = 0;
        //  übergebene Parameter => id/1/filter/name
        //  $splitted => id, 1, filter, name

        for ($i=0; $i < count($splitted); $i++) {
            //  solange $i kleiner ist als die Anzahl in $splitted wird $i erhöht.
            if ($i % 2 > 0) {
                //  zuerst wird wieder geprüft ob es sich um einen geradden oder ungeraden durchlauf handelt, wenn er gerade ist werden keine werte im Array gesetzt
                //  hier werden aus dem Array $splitted über den index[] die werte zugeordnet
                //  der erste durchlauf ist leer da $i(0) / 2 keine rest hat. $i wird dann um eins erhöht $i++
                $paramArray[$splitted[$lastIndex]] = $splitted[$i];
                //  id, 1, filter, name
                //  paramArray[$splitted["0"]] = $splitted["1"]
                //  paramArray[$splitted[id]] = $splitted[1]
                //  paramArray[$splitted["2"]] = $splitted["3"]
                //  paramArray[$splitted[filter]] = $splitted[name]
                //  hier wird über die indizies auf den werte im Array $splitted zugegriffen
            }
            $lastIndex = $i;
        }
        $this->_params = $paramArray;
    }

    public function run()
    {
        $ctrlObj = new $this->_controller;
        //  Klasse wird über die variable _controller instanziert, da über setController die Klasse an _controller übergeben wird.
        $ctrlObj->{$this->_action}($this->_params);
        //  hier werden dann die Prameter übergeben.
    }
}
