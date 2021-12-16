<?php

namespace Util;



class Pagination {

	private int $totalItems;
        private int $pages;
	private int $itemsPerPage;
	private int $currPage;

        public function __construct($data)
        {
                $this->totalItems = sizeof($data);
		$this->itemsPerPage = '10';
		$this->currPage = '3';
        }
        public function getPages()
        {
                 //      alle Items aus DB holen, zählen und dadurch die anzahl der aufrufbaren seiten definieren
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
        private function getNumPages()
	{
		$numPages = ceil($this->totalItems/$this->itemsPerPage);

		return $numPages;
	}	



}