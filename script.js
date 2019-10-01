function submitSuperlative(){
    var formData = $("#submit-superlatives-message").val();
    if((/.*[a-zA-Z].*/).test(formData) && formData.length > 1){
      $.ajax({
        type: "POST", 
        url: "submitSuperlative.php", 
        data: {superlative: escapeString(formData.trim())}, 
        success: function(data){
          if(data == "success"){
            alert("Your superlative is recorded!");
          }else{
            alert("Some error occured.");
          }
        }
      });
    }else{
      alert("Please enter a valid superlative!");
    }
    return false;
} 

function loadSuperlatives(isRetry){
   $.ajax({
    type: "POST",
    url: "loadSuperlatives.php",
    success: function(data){
      if(data.length > 1){
        $("#nominate-superlatives").html(data);
        var cookies = document.cookie.split(";");
        $("#pagination-bar").ready(loadPagination());
        if(document.cookie.length>0){
          cookies.forEach(function(cookie){
            $("#" + cookie.trim().substring(0, cookie.trim().indexOf("="))).addClass("highlighted");
          });
        }
      }else{
        if(isRetry < 4){
          loadSuperlatives(isRetry + 1 || 1);
        }
      }
    }
   });
}

function loadPagination(){
  pageNum = parseInt($("#pagination-bar").attr("value"));
  $("#pagination-bar").twbsPagination({
    totalPages: pageNum,
    startPage: 1,
    visiblePages: Math.min(pageNum, 10),
    onPageClick:function(event,page){
      $(".page-active").removeClass("page-active");
      $("#page"+page).addClass("page-active");
    }
  });
}

function like(button, superlative){
  var deselect = $(button).hasClass("highlighted")?1:0;
  $.ajax({
    type: "POST",
    url: "likeSuperlative.php",
    data: {superlative: superlative, deselect: deselect},
    success: function() {
      updateButton(button, deselect);
      if($("#" + superlative.replace(/[^a-zA-Z0-9]/g, '-') + "DislikeButton").hasClass("highlighted")){
        updateButton($("#" + superlative.replace(/[^a-zA-Z0-9]/g, '-') + "DislikeButton"), 1);
        $.ajax({
          type: "POST",
          url: "dislikeSuperlative.php",
          data: {superlative: superlative, deselect: 1}
        });
      }
    }
  });
}

function dislike(button, superlative){
  var deselect = $(button).hasClass("highlighted")?1:0;
  $.ajax({
    type: "POST",
    url: "dislikeSuperlative.php",
    data: {superlative: superlative, deselect: deselect},
    success: function() {
      updateButton(button, deselect);
      if($("#" + superlative.replace(/[^a-zA-Z0-9]/g, '-') + "LikeButton").hasClass("highlighted")){
        updateButton($("#" + superlative.replace(/[^a-zA-Z0-9]/g, '-') + "LikeButton"), 1);
        $.ajax({
          type: "POST",
          url: "likeSuperlative.php",
          data: {superlative: superlative, deselect: 1}
        });
      }
    }
  });
}

//updates the display of the like and dislike button 
//and sets or delete a cookie based on whether the button is clicked
function updateButton(button, deselect){
  if(!deselect){
    setCookie($(button).attr("id"), "1");
    $(button).addClass("highlighted");
    $(button).html(parseInt($(button).html()) + 1); 
  }else{
    deleteCookie($(button).attr('id'));
    $(button).removeClass("highlighted");
    $(button).html(parseInt($(button).html()) - 1); 
  }
}

function escapeString(str)
{
    var map =
    {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, function(m) {return map[m];});
}

function setCookie(name, value){
  document.cookie = name + "=" + value + "; expires=Wed, 13 Nov 2019 07:28:00 UTC"
}

function deleteCookie(name){
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function getCookie(name){
  var cookies = document.cookie.split(";");
  cookies.forEach(function(cookie){
    if(cookie.indexOf(name) > -1){
      return cookie.substring(cookie.indexOf(name));
    }
  })
  return "";
}