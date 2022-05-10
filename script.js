
$(document).ready(function() {
  // Sets Cloudinary config
  $.cloudinary.config({ cloud_name: 'majincloud', secure: false});
  let transformationButton = document.getElementById('transformationButton');
  var uploadButton = document.getElementById('uploadImageButton');
 
  //Upload for file upload
  if($.fn.cloudinary_fileupload !== undefined) {
    $("input.cloudinary-fileupload[type=file]").cloudinary_fileupload();
  }

  // Begin task 1 code
  uploadButton.onclick = function(){
     let urlvar = document.getElementById('urlInput').value;
     let secondParam = {type: "fetch", transformation: [
          {gravity: "face", height: 300, width: 300, crop: "fill"},
          {radius: "max"},
          {fetch_format: "auto"}
      ]}
      //start cloudinary fetch code
      $.cloudinary.image(urlvar, secondParam);
      let imagePreview = $.cloudinary.imageTag(urlvar, secondParam).toHtml();
      //end cloudinary fetch code

      //renders the uploaded image with effects
      $('.uploadedImage').empty().append(imagePreview);
  }

  //Prevents redirection when hitting enter in input field
   $("#overLayText").keydown(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
  });
  //Applies all selected transformations
  transformationButton.onclick = function(){
     let secondParam = {type: "fetch", transformation: [
      {gravity: "face", height: 300, width: 300, crop: "fill"},
      {radius: "max"},
      {fetch_format: "auto"}
    ]}
    // Check for any transformation checkmarks before submitting
    $(':checkbox:checked').each(function () {
    // Need to set this.val() as var to use in the cloudinary.image POST
        secondParam.transformation.push({effect: $(this).val()});
    });

    let inputText = document.getElementById('overLayText').value;
    if( inputText ){
      secondParam.transformation.push({overlay: new cloudinary.TextLayer().fontFamily("Arial").fontSize(24).fontWeight("bold").text(inputText)});
    }
    let urlvar = document.getElementById('urlInput').value;

    //start cloudinary fetch code
    $.cloudinary.image(urlvar, secondParam);
    let imagePreview = $.cloudinary.imageTag(urlvar, secondParam).toHtml();
    //end cloudinary fetch code

    //renders the uploaded image with effects
    console.log(imagePreview);
    $('.uploadedImage').empty().append(imagePreview);
  }
});

//https://cdn.pixabay.com/photo/2019/11/08/11/56/cat-4611189__340.jpg
//https://en.wikipedia.org/wiki/Cat#/media/File:Cat_poster_1.jpg
//https://images.unsplash.com/photo-1506755855567-92ff770e8d00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3456&q=80