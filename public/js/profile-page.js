var inputs = document.getElementsByName('profileImage');

for (var i = 0, len = inputs.length; i < len; i++) {
    input = inputs[i];
    input.onmouseover = function(){
        this.setAttribute('data-orig-image',this.getAttribute('src'));
        this.src = this.getAttribute('data-alt-image');
    };
    input.onmouseout = function(){
        this.src = this.getAttribute('data-orig-image');
    };
}


$('#but_upload').on('click', function() {
    $('#file-input').trigger('click');
    $('#file-input').change( file => {
        
        console.log(file.target.files[0])

        var fd = new FormData();
        var files = file.target.files[0];
        fd.append('profileImage',files);

        $.ajax({
            url: '/save?type=profileImage',
            type: 'post',
            data: fd,
            contentType:false,
            processData: false,
            success: function(data){
               
                    console.log(data)
                    $("#profile-img").attr("src","/"+data); 
                    $(".preview img").show(); // Display image element
                
            },
            error: function(xhr, textStatus, errorThrown){
                alert('file not uploaded');
               
            },   
        });


    });
    console.log("enter")
});

function savePublicInfo(){

var bio = document.getElementById("inputBio").value;

if(bio == ''){
    return;
}
var dataString = {
    Biography : bio
};
console.log(dataString)
new Promise ( (resolve , reject ) => {$.ajax({
    url: '/save?type=publicInfo',
    type: 'post',
    data: JSON.stringify(dataString),
    contentType: 'application/json',
    processData: false,
    success: function(textStatus ){
        
        resolve(textStatus)

    },
     error: function(xhr, textStatus, errorThrown){
        reject(textStatus)
       
    },    
});

}).then(data => {
    document.getElementById("inputBio").value = null
    document.getElementById("inputBio").placeholder = bio

}).catch(error => {
    alert(error);
})


};





// $(document).ready(function(){

//     $("#but_upload").click(function(){

//         $('#file-input').trigger('click');

//         var fd = new FormData();
//         var files = $('#file')[0].files[0];
//         fd.append('file',files);

//         $.ajax({
//             url: 'upload.php',
//             type: 'post',
//             data: fd,
//             contentType: false,
//             processData: false,
//             success: function(response){
//                 if(response != 0){
//                     $("#img").attr("src",response); 
//                     $(".preview img").show(); // Display image element
//                 }else{
//                     alert('file not uploaded');
//                 }
//             },
//         });
//     });
// });