<?php

namespace Util;


class Pagination {

	private int $totalItems;
	private int $itemsPerPage;
	private int $currPage;

        public function __construct()
        {

        }
        public function getAllItems(array $dataset)
        {
                 //      alle Items aus DB holen, zählen und dadurch die anzahl der aufrufbaren seiten definieren
                 $this->totalItems = count($dataset);

		return $this->totalItems;
        }
        public function setLimit()
        {
                //      Wieviele Einträge sollen pro Seite angezeigt werden?
        }
        public function setCurrPage()
        {
                //      welche Einträge sollen angezeigt werden. basierend auf dem Limit
        }



}