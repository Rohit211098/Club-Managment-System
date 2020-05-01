$(function () {
    $('#datePicker').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        autoclose: true,
        changeMonth: true,
        changeYear: true,
        orientation: "button"
    });
});


$(function () {
    $('#clockpicker').clockpicker({
        autoclose: true,
    });
});

$(document).ready(function(){  
    var i=1;  
    $('#add').click(function(){  
         i++;  
         $('#dynamic_field').append('<tr class="table-border-hidden" id="row'+i+'"><td><input type="text" name="name['+i+']" placeholder="Cordinator UserId" class="form-control name_list" /></td><td><button type="button" name="remove" id="'+i+'" class="btn btn-danger btn_remove">X</button></td></tr>');  
    });  
    $(document).on('click', '.btn_remove', function(){  
         var button_id = $(this).attr("id");   
         $('#row'+button_id+'').remove();  
    });  
});


$("form").on("change", ".file-upload-field", function(){ 
    $(this).parent(".file-upload-wrapper").attr("data-text",         $(this).val().replace(/.*(\/|\\)/, '') );
});






