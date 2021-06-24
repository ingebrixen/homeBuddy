<?php
/**  (c) Thomas Böhme **/



namespace Util;

use Model\Bild;


class Image
{
    public static function renderImg($imgId, $height)
    {
        /** @var \Model\Resource\Bild $bildResource */
        $bildResource = \App::getResourceModel('Bild');
        $bild = $bildResource->getBild($imgId);

        if (!$bild) {
            \header('HTTP/1.0 404 Not Found');
            echo "Bild nicht gefunden";
            return;
        }

        $imgPath = BASEPATH . '/bilder/' . $bild->getPath();
        $imgData = \imagecreatefromjpeg($imgPath);

        //Skalieren
        $origWidth = \imagesx($imgData);
        $origHeight = \imagesy($imgData);

        $width = (($origWidth * $height) / $origHeight);
        $scaledImg = \imagecreatetruecolor($width, $height);

        \imagecopyresized($scaledImg, $imgData, 0, 0, 0, 0, $width, $height, $origWidth, $origHeight);

        //rueckgabe
        \ob_start();
        \imagejpeg($scaledImg);
        $data = \ob_get_contents();
        \ob_end_clean();

        return $data;
    }
    public static function processUpload($uploadedFile)
    {
        $tmpFile = $uploadedFile['tmp_name'];
        $fileName = $uploadedFile['name'];
        $imgExt = pathinfo($fileName, PATHINFO_EXTENSION);

        // checks
        if (!getimagesize($tmpFile)) {
            throw new \RuntimeException('Das ist leider kein Bild');
        }

        if ($imgExt != "jpg" && $imgExt != "jpeg") {
            throw new \RuntimeException('Nur JPG erlaubt');
        }

        if ($uploadedFile['size'] > 5000000) {
            throw new \RuntimeException("Datei ist zu groß");
        }

        // process
        $imgDir = BASEPATH . '/bilder/';
        $randomFile = sprintf("%s.%s", self::_getRndString(), $imgExt);
        $targetPath = $imgDir . $randomFile;

        if (move_uploaded_file($tmpFile, $targetPath)) {
            /** @var Bild $bild */
            $bild = \App::getModel('Bild');
            $bild->setName($fileName);
            $bild->setPath($randomFile);

            /** @var \Model\Resource\Bild $resource */
            $resource = \App::getResourceModel('Bild');
            $newId = $resource->insertImg($bild);

            return $newId;
        }

        return false;
    }

    protected static function _getRndString()
    {
        return \sha1(\uniqid(\rand(1, 232222) . md5(\microtime()) . \mt_rand(), true));
    }
}
