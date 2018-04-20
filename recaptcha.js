var imgId = []; // to store the image_name and Image_id
var targetImg = []; // to store the target Images
var remImg = []; // to store images other than target images
var quesArray = ["tiger", "cat", "cartoon"]; // to store questions
var quesIndex; // to store the current questions index

generateQuestion(quesArray); 
generateCaptcha();
$("#msg").hide();

$("#New").click(function(){
  imgId.length = 0;
  targetImg.length = 0;
  remImg.length = 0;
  $("#msg").hide();
  generateQuestion(quesArray);
  generateCaptcha();
});

$("#Verify").click(function () {
  $("#msg").hide();
  targetImg.length = 0;
  remImg.length = 0;
  var flag = false,
  flag1 = false;
  count = 0;
  var re = "^.*" + quesArray[quesIndex] + ".*$"; //create the regular expression based on current question
  re = new RegExp(re);
  
  for(var i =0; i<imgId.length; i++) {
    if(imgId[i].name.match(re)) 
    {
      targetImg.push(imgId[i]);
    } else {
      remImg.push(imgId[i]);
    }
  }

  for( var i =0; i < remImg.length; i++) {
    var restId = document.getElementById(remImg[i].id);
    if(restId.checked) {
      flag1 = false;
      break;
    } else {
      flag1 = true;
    }
  }

  if(flag1) {
    for( var i = 0; i< targetImg.length; i++) {  
      var targetId = document.getElementById(targetImg[i].id);
      if(targetId.checked) {
        flag = true;
        count ++;
      } else {
        flag = false;
      }
    }
  } else {
    flag = false;
  }

  if(flag && count == targetImg.length) {
    $("#msg").show(); //display verification message
    $("#msg").text("✓ Verified");
    $("#msg").css("color", "green");
    $('input[type=checkbox]').each(function() { this.checked = false; });//uncheck all the checked images 
  } else {
    $("#msg").show();
    $("#msg").text("X Do Not Match");
    $("#msg").css("color", "red");
    $('input[type=checkbox]').each(function() { this.checked = false; });
  }
});

// function to generate quesion at the top 
function generateQuestion(quesArray) {
  quesIndex = parseInt(Math.random() * 3);
  $("#question").text('Select all the images containing ' + quesArray[quesIndex] + '!!!!!!');
}

// function to generate recaptcha
function generateCaptcha() { 
  var imagesArray = [
  'images/tiger1.png', 
  'images/cartoon3.png',
  'images/cat3.png', 
  'images/tiger2.png', 
  'images/cartoon1.png', 
  'images/cat1.png', 
  'images/tiger3.png',
  'images/cartoon2.png',
  'images/tiger4.png',
  'images/cat2.png',
  ];
  var num = randomizeImg(imagesArray);

  //function to display random images
  function showImage() {
    var imageId = "";
    $("#displayImages").html("");

    for (var i=0; i<6 ; i++) {
      imageId = "myCheckbox" + (i + 1);
      $("#displayImages").append(
        '<input type="checkbox" id="'+ imageId +'"/><label for="'+ imageId +'" class="image"><img src ="' + num[i] + '"/>');
      if((i +1) % 2 == 0 && i!=0) {
        $("#displayImages").append('<br>');
      }
      imgId.push({name: num[i], id: imageId});
    }
  }

  // function to shuffle the images stored imagesArray
  function randomizeImg(imagesArray) {
    var temp,j,i;
    var len = imagesArray.length;
    for(i = len; i>0; i--) {
      j = parseInt(Math.random() * i);
      temp = imagesArray[i-1];
      imagesArray[i-1] = imagesArray[j];
      imagesArray[j] = temp;
    }
    return imagesArray;
  }
  showImage();
}

