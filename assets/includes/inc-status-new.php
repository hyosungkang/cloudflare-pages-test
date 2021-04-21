<?php
    $errors = array();
    // $support_services = array(7 => 'Core', 8 => 'Internet', 9 => 'Voice', 1 => 'Hosting', 3 => 'Email', 2 => 'DNS', 5 => 'VPS', 6 =>'Backup');
    $support_services = array('Core' => [7], 'Internet' => [8], 'Voice' => [9], 'Hosting' => [1, 2, 5, 6], 'Email' => [3]);
    $date_format = 'j M Y H:i T';

    // Suppress warnings!
    error_reporting(E_ERROR);
    try
    {
        // read the xml from issue notifier into an array
        //$feed = new SimpleXMLElement('http://issue-notifier.devel.net.nz/published_feeds/data.xml', NULL, TRUE);
        $feed = new SimpleXMLElement('http://sin.net24.co.nz/published_feeds/data.xml', NULL, TRUE);
    }
    catch(Exception $e)
    {
        @mail('debug.devel.net.nz', '[sin][exception]Public feed failed to load', 'RSS link broken, error ' . $e->getMessage());
        array_push($errors, 'The Service Status Page is currently unavailable. Please check back later.');
    }

?>
