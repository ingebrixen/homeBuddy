<?php

namespace Util;



class Pagination {

	private int $totalItems;
        private int $pages;
	private int $itemsPerPage;
	private int $currPage;

        public function __construct(string $table)
        {
                //$this->totalItems = sizeof($data);
		$this->itemsPerPage = '10';
		$this->currPage = '3';
                $model = \App::getResourceModel('DBHandler');
                $this->totalItems = $model->countItems($table);
        }
        public function getPages()
        {
                 //     erzeugt die Anzahl der Seiten basierend auf den Gesamt Items 
                 //     und der max Anzahl der Einträger die angezeigt werden sollen
                $this->pages = ceil($this->totalItems/$this->itemsPerPage);

		return $this->pages;
        }
/*         public function setLimit()
        {
                //      Wieviele Einträge sollen pro Seite angezeigt werden?
        } */
        public function setCurrPage()
        {
                //      welche Einträge sollen angezeigt werden. basierend auf dem Limit
        }
}