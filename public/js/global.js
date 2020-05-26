

(function ($) {
    'use strict';
  
    try {
        
        $('#loginModal').on('hidden.bs.modal', function (e) {
            $('.alert').remove();
        })
        $('#loginHeadModal').on('hidden.bs.modal', function (e) {
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
});


