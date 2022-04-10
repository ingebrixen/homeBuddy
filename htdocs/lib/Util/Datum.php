<?php


namespace Util;

class Datum  
{
    //  erzeugt den einen dynamischen Datumsselector um sich einträge des jeweiligen Monats im letzten Jahr anzeigen zu lassen.
    public static function getDateRange()
    {
        $Start  = new \DateTime(date('Y-m-d')); 
        $dtEnd = new \DateTime(date('m/y'));    
        $dtEnd->modify('first day of next month');
        
        $dtStart = $Start->modify('-1 year');
        
        $period = new \DatePeriod(
            $dtStart,
            new \DateInterval('P1M'), 
            $dtEnd
        );
        
        $period = array_reverse(iterator_to_array($period));

        return $period;
    }
}
