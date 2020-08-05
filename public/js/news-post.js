$('#radioGeneral').click(function() {
    if($('#radioGeneral').is(':checked')) {
        $('#eventSelector').css('visibility', 'hidden');

     }
 });

 $('#radioClubRelated').click(function() {
    if($('#radioClubRelated').is(':checked')) {
        $('#eventSelector').css('visibility', 'hidden');
         }
 });

 $('#radioEventRelated').click(function() {
    if($('#radioEventRelated').is(':checked')) {
        $('#eventSelector').css('visibility', 'visible');
        }
 });



 $(document).ready(function() {
    $("#btnSubmit").click(function(){


        var heading = document.getElementById("heading").value;
        var shortDescription = document.getElementById("shortDescription").value;
        var fullDescription = document.getElementById("fullDescription").value;
        var imageFile = document.getElementById("newsImages").files.item(0)

        var tag ;
        if($('#radioGeneral').is(':checked')) {
            tag = "General";
        }else if($('#radioClubRelated').is(':checked')) {
            tag = "ClubRelated";
        }else if($('#radioEventRelated').is(':checked')) {
            tag = "EventRelated";
        }
        var event ;
        if(tag == "EventRelated"){
            event  =  $("input[name='selection']:checked").val();
        }
        
    
       
        if(heading == "" || shortDescription == "" ||fullDescription == "" ){
            $.notify("Please Fill All The Details" , {
               
                autoHide: false,
                position: 'right bottom',
                className: 'error'
               
              });
        }else{

            var fd = new FormData();
            fd.append('heading',heading);
            fd.append('shortDescription',shortDescription);
            fd.append('fullDescription',fullDescription);
            fd.append('event',event);
            fd.append('newsImages',imageFile);

            console.log(fd)
            new Promise ( (resolve , reject ) => {$.ajax({
            url: '/news-post?tag='+tag,
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: function(textStatus ){
                
                resolve(textStatus)
        
            },
             error: function(textStatus){
                reject(textStatus.error)
               
            },    
        });
        
        }).then(data => {
        
            if(data == 'success'){
                $.notify("Post SuccessFully ", {
                    autoHide: false,
                    position: 'right bottom',
                    className: 'success'
                  });
            
            }else{
                alert(data)
            }
         
        
        }).catch(error => {
            alert(error);
        })
        }
    
       
       
    }); 
});
 