function register(clubId,eventId){

    try{

        console.log("clubId" + clubId +" eventId"+eventId)
 
          
        new Promise ( (resolve , reject ) => {$.ajax({
            url: '/event-registration?clubId='+clubId+"&&eventId="+eventId,
            type: 'post',
            contentType: 'text/html',
            processData: false,
            success: function(textStatus ){
                
                resolve(textStatus)
        
            },
             error: function(xhr, textStatus, errorThrown){
                reject(textStatus)
               
            },    
        });
        
        }).then(data => {
    
           
            if(data == '0'){
            
                console.log("Please Fill College Details In profile Before Registring")
                $.notify("Please Fill College Details In profile Before Registring" , {
               
                    autoHide: false,
                    position: 'right bottom',
                    className: 'error'
                   
                  });
            }else if(data == '2'){
                $.notify("Please Register To Club First" , {
               
                    autoHide: false,
                    position: 'right bottom',
                    className: 'error'
                   
                  });
            }
            else{
    
               
                $("#buttonRegister").html("Registred");
                $("#buttonRegister"). attr('disabled', true);
    
                console.log("Applied SuccessFully ")
                $.notify("Applied SuccessFully ", {
               
                    autoHide: false,
                    position: 'right bottom',
                    className: 'success'
                   
                  });
            }
    
           
            
           
        
        }).catch(error => {
            alert(error);
        })

    }catch(error){
        console.log(error)
    }
    
    
    
    
}