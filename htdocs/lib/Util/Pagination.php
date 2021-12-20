<?php

namespace Util;

class Pagination {

	private int $_totalItems;
        private int $_pages;
	private int $_itemsPerPage;
	private int $_currPage = 1;
        private int $_prevPage;
        private int $_nextPage;
        private int $_offset;

        public function __construct(string $table, array $params)
        {
		$this->_itemsPerPage = 15;
                if (array_key_exists('page', $_GET)) {
                        $this->_currPage = $_GET['page'];
                }

                $model = \App::getResourceModel('DBHandler');
                $this->_totalItems = $model->countItems($table, $params);

                $this->_nextPage = $this->_currPage + 1;
                $this->_prevPage = $this->_currPage - 1;
                $this->_offset = ($this->_currPage - 1) * $this->_itemsPerPage;
        }
        public function countItems()
        {
                return $this->_totalItems;
        }
        public function getPages()
        {
                $this->_pages = ceil($this->_totalItems/$this->_itemsPerPage);

		return $this->_pages;
        }
        public function getOffset()
        {
                return $this->_offset;
        }
        public function getCurrPage()
        {
                if (!empty($this->_currPage)) {
                        return $this->_currPage;
                }                
        }
        public function getNextPage()
        {
                return $this->_nextPage;
        }
        public function getPrevPage()
        {
                return $this->_prevPage;
        }
}