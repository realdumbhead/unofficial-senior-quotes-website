<?php
    $superlative = $_POST["superlative"].trim();
    $deselect = $_POST["deselect"];
    if(strlen($superlative) < 2|| ($deselect != 0 && $deselect != 1)){
        echo "Data was not sent properly!";
        exit(1);
    }
    $file = fopen("superlatives.json", "a+");
    $arr = json_decode(fread($file, filesize("superlatives.json")), TRUE);
    foreach($arr as $key => $item){
        if($arr[$key]["superlative"] === $superlative){
            $arr[$key]["likes"] += ($deselect?-1:1);
        }
    }
    ftruncate($file, 0);
    fwrite($file, json_encode($arr));
    fclose($file);

    $record = fopen("likesInfo.json", "a+");
    $recordArr = json_decode(fread($record, filesize("likesInfo.json")), TRUE);
    $recordArr[] = ["type" => "like", "deselect" => $deselect, "header" => getallheaders()];
    ftruncate($record, 0);
    fwrite($record, json_encode($recordArr));
    fclose($record);
?>
