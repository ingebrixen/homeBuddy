<?php
/**  (c) Thomas Böhme **/


namespace Util;

class Datum  
{
    public function getDateRange()
    {
        $Start  = new \DateTime(date('Y-m-d')); // Datum von
        $dtEnd = new \DateTime(date('m/y'));    // Datum bis
        
        $dtStart = $Start->modify('-1 year');
        
        $period = new \DatePeriod(
            $dtStart,
            new \DateInterval('P1M'), // Periode: 1 Monat
            $dtEnd
        );
        
        $period = array_reverse(iterator_to_array($period));

        return $period;
    }
}
