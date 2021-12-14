<?php

namespace Util;


class Pagination {

	private int $totalItems;
	private int $itemsPerPage;
	private int $currPage;

        public function __construct()
        {

        }
        public function getAllItems()
        {
                //      alle Items aus DB holen, zählen und dadurch die anzahl der aufrufbaren seiten definieren
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