<?php
/**  (c) Thomas Böhme **/



namespace Controller;

class Image extends Base {

    public function viewAction($params) {
        $id = (int)$params['id'];
        $height = (isset($params['height'])) ? (int)$params['height'] : 250;

        $img = \Util\Image::renderImg($id, $height);
        if (!$img) {
            return;
        }

        header('Content-Type: image/jpeg');
        echo $img;
    }
}