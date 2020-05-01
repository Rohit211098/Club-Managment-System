

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
            url: '/faculty-save?type=profileImage',
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
var dob = document.getElementById("inputDOB").value;


if(bio == '' && dob =='' ){
    return;
}

var dataString = {
    Biography : bio,
    dob : dob
};
console.log(dataString)
new Promise ( (resolve , reject ) => {$.ajax({
    url: '/faculty-save?type=publicInfo',
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
    if(!checkEmpty(bio)){
        document.getElementById("inputBio").value = null
        document.getElementById("inputBio").placeholder = bio
    }
    if(!checkEmpty(dob)){
        document.getElementById("inputDOB").value = null
        document.getElementById("inputDOB").placeholder = dob
    }
   

}).catch(error => {
    alert(error);
})


}



function saveSocialInfo() {


    var facebook = document.getElementById("inputFacebook").value;
    var twitter = document.getElementById("inputTwitter").value;




    var dataString = {
        facebook: facebook,
        twitter: twitter
    };

    console.log(dataString)
    new Promise((resolve, reject) => {
        $.ajax({
            url: '/faculty-save?type=socialInfo',
            type: 'post',
            data: JSON.stringify(dataString),
            contentType: 'application/json',
            processData: false,
            success: function (textStatus) {

                resolve(textStatus)

            },
            error: function (xhr, textStatus, errorThrown) {
                reject(textStatus)

            },
        });

    }).then(data => {
        if (!checkEmpty(facebook)) {
            document.getElementById("inputFacebook").value = null
            document.getElementById("inputFacebook").placeholder = facebook
        }
        if (!checkEmpty(twitter)) {
            document.getElementById("inputTwitter").value = null
            document.getElementById("inputTwitter").placeholder = twitter
        }


    }).catch(error => {
        alert(error);
    })


}





function saveCollegeInfo() {
    var inputCollegeName = document.getElementById("inputCollegeName").value;
    var inputCollegeCode = document.getElementById("inputCollegeCode").value;
    var inputCorse = document.getElementById("inputCorse").value;
    var inputBranch = document.getElementById("inputBranch").value;


    var dataString = {
        name: inputCollegeName,
        code: inputCollegeCode,
        corse: inputCorse,
        branch: inputBranch,
    

    };

    console.log(dataString)

    new Promise((resolve, reject) => {
        $.ajax({
            url: '/faculty-save?type=collegeInfo',
            type: 'post',
            data: JSON.stringify(dataString),
            contentType: 'application/json',
            processData: false,
            success: function (textStatus) {

                resolve(textStatus)

            },
            error: function (textStatus) {
                reject(textStatus.error)

            },
        });

    }).then(data => {

        if (data == 'success') {

            if (!checkEmpty(inputCollegeName)) {
                document.getElementById("inputCollegeName").placeholder = inputCollegeName;
                document.getElementById("inputCollegeName").value = null
            }
            if (!checkEmpty(inputCollegeCode)) {
                document.getElementById("inputCollegeCode").value = null
                document.getElementById("inputCollegeCode").placeholder = inputCollegeCode;
            }
            if (!checkEmpty(inputCorse)) {
                document.getElementById("inputCorse").value = null
                document.getElementById("inputCorse").placeholder = inputCorse;
            }
            if (!checkEmpty(inputBranch)) {
                document.getElementById("inputBranch").value = null
                document.getElementById("inputBranch").placeholder = inputBranch;
            }
         



        }


    }).catch(error => {
        alert(error);
    })

}




function saveClubInfo(id){

    var description = document.getElementById("inputClubDescription").value;
    var imageLogo = document.getElementById("clubLogo").files.item(0);
    var imageBanner = document.getElementById("clubBigBanner").files.item(0);

    console.log(description,imageLogo)

    var fd = new FormData();
    // var files = file.target.files[0];
    fd.append('description',description);
    fd.append('clubLogo',imageLogo);
    fd.append('clubBanner',imageBanner);
  

    console.log(id+"sf")

    // var dataString = {
    //     description : description,
    //     clubLogo : imageLogo,
    //     clubBanner : imageBanner
    // };
    

    
  
    
    new Promise ( (resolve , reject ) => {$.ajax({
        url: '/club-save?id='+id,
        type: 'post',
        data: fd,
        contentType: false,
        processData: false,
        success: function(textStatus ){
            
            resolve(textStatus)
    
        },
         error: function(xhr, textStatus, errorThrown){
            reject(textStatus)
           
        },    
    });
    
    }).then(data => {
        if(!checkEmpty(description)){
            document.getElementById("inputClubDescription").value = null
            document.getElementById("inputClubDescription").placeholder = description
        }
        if(imageLogo != undefined){
            $("#club-logo").attr("src","/"+data); 
            $("#clubLogoData").attr("data-text","select"); 
          
            document.getElementById("clubLogo").value = null;
           
    
        }if(imageBanner != undefined){
            $("#clubBigBannerData").attr("data-text","select"); 
            document.getElementById("clubBigBanner").value = null;
        


        }

        console.log(data)


       
    
    }).catch(error => {
        alert(error);
    })
    
    
}


function savePersonalInfo(){

var firstName = document.getElementById("inputFirstName").value;
var lastName = document.getElementById("inputLastName").value;
var email = document.getElementById("inputEmail").value;
var addressText = document.getElementById("inputAddress").value;
var city = document.getElementById("inputCity").value;
var state = document.getElementById("inputState").value;
var zip = document.getElementById("inputZip").value;

var gender =  document.querySelector( 
    'input[name="gender"]:checked').value

    if(document.getElementById("fat").checked){
        var gender = 'Male'
    }else if(document.getElementById("fit").checked){
        var gender = 'Female'
    }





var dataString = {
    firstName : firstName,
    lastName : lastName,
    email :email,
    addressText : addressText,
    city : city,
    state : state,
    zip : zip,
    gender : gender

};

console.log(dataString)
new Promise ( (resolve , reject ) => {$.ajax({
    url: '/faculty-save?type=personalInfo',
    type: 'post',
    data: JSON.stringify(dataString),
    contentType: 'application/json',
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
        
    if(!checkEmpty(firstName)){
        document.getElementById("inputFirstName").placeholder = firstName;
        document.getElementById("inputFirstName").value = null
    }
    if(!checkEmpty(lastName)){
        document.getElementById("inputLastName").value = null
        document.getElementById("inputLastName").placeholder = lastName;
    }
    if(!checkEmpty(email)){
        document.getElementById("inputEmail").value = null
        document.getElementById("inputEmail").placeholder = email;
    }
    if(!checkEmpty(addressText)){
        document.getElementById("inputAddress").value = null
        document.getElementById("inputAddress").placeholder = addressText;
    }
    if(!checkEmpty(city)){
        document.getElementById("inputCity").value = null
        document.getElementById("inputCity").placeholder = city;
    }
    if(!checkEmpty(state)){
        document.getElementById("inputState").value = null
        document.getElementById("inputState").placeholder = state;
    }
    if(!checkEmpty(zip)){
        document.getElementById("inputZip").value = null
        document.getElementById("inputZip").placeholder = zip;
    }

    if(gender == 'Male'){
        document.getElementById("fat").checked = true
    }else {
        document.getElementById("fit").checked = true
    }
    }
 

}).catch(error => {
    alert(error);
})

}



function checkEmpty(value){

    if(value == '' ){
      return true
    }
  
    return false
  }