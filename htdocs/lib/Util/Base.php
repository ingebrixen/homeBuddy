<?php

namespace Util;

class Base {

        protected function updateKasse(array $_post)
        {
                $udKasse = \App::getResourceModel('DBHandler');

                $udKasse->insertData('haushaltskasse', $this->_post);

                return $this;
        }
        protected function updateKonto()
        {
                $udKonto = \App::getResourceModel('DBHandler');

                $udKonto->updateData('persKonto', 'konto', $this->_konto, $this->_uid);

                return $this;
        }
        protected function updateLend()
        {
                $udLend = \App::getResourceModel('DBHandler');

                $udLend->updateData('persKonto', 'lend', $this->_lend, $this->_uid);
                
                return $this;
        }
        protected function unsetPost()
        {
                unset($this->_post['wForm'], $this->_post['lend'], $this->_post['konto'],$this->_post['uid']);
        }
}