<?php
    $superlative = $_POST["superlative"].trim();
    if(strlen($superlative) < 2){
        echo "Data was not sent properly!";
        exit(1);
    }
    $header = getallheaders();
    $file = fopen("superlatives.json", "a+");
    $arr = json_decode(fread($file, filesize("superlatives.json")), TRUE);
    $superlativeAlreadyExists = false;
    foreach($arr as $item){
        if($item["superlative"] === $superlative){
            $superlativeAlreadyExists = true;
        }
    }
    if(!$superlativeAlreadyExists){
        $arr[] = ["superlative" => $superlative, "header" => $header, "likes" => 0, "dislikes" => 0];
        $json = json_encode($arr);
        if(isset($json)){
            ftruncate($file, 0);
            fwrite($file, $json);
        }
        echo "success";
    }else{
        echo "duplicate";
    }

    fclose($file);
?>