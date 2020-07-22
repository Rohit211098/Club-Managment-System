

(function ($) {
    'use strict';
  
    try {
        
        $('#loginModal').on('hidden.bs.modal', function (e) {
            $('.alert').remove();
        })
        $('#loginFacultyModal').on('hidden.bs.modal', function (e) {
            $('.alert').remove();
        })
        $('#signupModal').on('hidden.bs.modal', function (e) {
          $('.alert').remove();
        })
        $('#signupModalFaculty').on('hidden.bs.modal', function (e) {
          $('.alert').remove();
      })

    } catch(er) {console.log(er);}



})(jQuery);



$(function() {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    $("form[name='userLogin']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        loginRollNo: { 
          required : true,
          number : true

        } ,
      
        loginPassword: "required"
      },
      // Specify validation error messages
      messages: {
        loginRollNo: "Please enter Valid RollNumber",
        
        loginPassword: "Please enter Valid Password",
       
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });

    $("form[name='facultyLogin']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        loginEmail: "required",
      
        loginPassword: "required"
      },
      // Specify validation error messages
      messages: {
        loginEmail: "Please enter Valid Email",
        
        loginPassword: "Please enter Valid Password",
       
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });



    $("form[name='userSignUp']").validate({
      // Specify validation rules
      rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        signupRollNo: { 
          required : true,
          number : true

        } ,

        signupFirstName : "required",

        signupLastName : "required",

        signupUserName : "required",

        signupEmail : "required",

        signupPassword: "required"
      },
      // Specify validation error messages
      messages: {
        signupRollNo: "Please enter Valid RollNumber",
        signupFirstName: "Please enter Valid First Name",
        signupLastName: "Please enter Valid Last Name",
        signupUserName: "Please enter Valid UserName",
        signupEmail: "Please enter Valid Email",
        
        signupPassword: "Please enter Valid Password"
       
      },
      // Make sure the form is submitted to the destination defined
      // in the "action" attribute of the form when valid
      submitHandler: function(form) {
        form.submit();
      }
    });




  $("form[name='facultySignUp']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
   

      signupFirstName : "required",

      signupLastName : "required",

      signupUserName : "required",

      signupEmail : "required",

      signupPassword: "required"
    },
    // Specify validation error messages
    messages: {
      
      signupFirstName: "Please enter Valid First Name",
      signupLastName: "Please enter Valid Last Name",
      signupUserName: "Please enter Valid UserName",
      signupEmail: "Please enter Valid Email",
      
      signupPassword: "Please enter Valid Password"
     
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });



  $("form[name='createEvent']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
   

      eventName : "required",

      eventDescription : "required",

      eventDate : "required",

      eventTime : "required",

      eventRegistrationFees: "required",

      eventStartDate : "required",

      eventStartTime : "required",

      eventEndDate : "required",

      eventEndTime : "required",

      smallBanner: "required",

      bigBanner : "required",

      eventLocation : "required",

      cordinatorId : "required",

     
    },
    // Specify validation error messages
    messages: {
      
      eventName: "Please Enter Event Name",
      eventDescription: "Please Enter Event Description",
      eventDate : "Please Enter Event Date",

      eventTime : "Please Enter Event Time",

      eventRegistrationFees: "Please Enter Registration Fees",

      eventStartDate : "Please Enter Registration Start Date",

      eventStartTime : "Please Enter Registration Start Time",

      eventEndDate : "Please Enter Registration End Date",

      eventEndTime : "Please Enter Registration End Time",

      smallBanner: "Please Select Samll Banner",

      bigBanner : "Please Select Big Banner",

      eventLocation : "Please Enter Event Location",

      cordinatorId : "Please Enter At Least One Cordinator ID",
    },
    errorElement : 'div',
    errorLabelContainer: '.errorTxt',
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});


