<?php
    $file = fopen("superlatives.json", "r");
    $arr = json_decode(fread($file, filesize("superlatives.json")), TRUE);
    $allsuperlatives = "<div class='page page-active' id='page1'>";
    shuffle($arr);
    $arrLength = count($arr);
    for($i = 0; $i < $arrLength; $i++){
        $id = preg_replace('/[^a-zA-Z0-9]/', '-', $arr[$i]["superlative"]);
        $allsuperlatives .= 
            '<br>
            <div class="quote-div" id="'.$id.'">
                <h5>"'.$arr[$i]["superlative"].'"</h5>
                <div>
                    <img class="thumb-image" src="images/thumbsup.png">
                    <button class="likes" id="'.$id.'LikeButton" onclick="like(this, \''.htmlspecialchars($arr[$i]["superlative"]).'\')">'.$arr[$i]["likes"].'</button>
                    <img class="thumb-image" src="images/thumbsdown.png">
                    <button class="likes" id="'.$id.'DislikeButton" onclick="dislike(this, \''.htmlspecialchars($arr[$i]["superlative"]).'\')">'.$arr[$i]["dislikes"].'</button>
                </div>
            </div>';
        if($i % 10 == 9){
            $allsuperlatives .= '</div><div class="page" id="page'.(($i+1)/10+1).'">';
        }
    }
    $allsuperlatives .= '</div><br><ul class="pagination-sm" id="pagination-bar" value="'.floor($arrLength/10+1).'">';
    echo $allsuperlatives;
    fclose($file);
?>