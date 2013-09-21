
$(document).ready(function(){	
	 $("#signup-form").validate({	       
		 submitHandler: function(form) {
			 $(form).ajaxSubmit({					
					success	: function(responseText, status, xhr, $form){
						if (status == 'success')
						{
							window.location.href = '/';
						}
					},
					error : function(e){
						$('#registration-error').removeClass('hidden');
						
						if (e.responseText == 'email-taken'){
						    $('#registration-error').html("The email has been taken");						
						}	else {
							$('#registration-error').html(e.responseText);
						}
					}
				}); 				
			}
	    });
 });
	