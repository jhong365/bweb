function HomeController() {

	// bind event listeners to button clicks //
	var that = this;

	// handle user logout //
	$('#logout').click(function() {
		that.attemptLogout();
	});

	// login //
	$('#login').click(function() {
		$('#login-container-modal').modal('show');
	});

	$('#create-account').click(function() {
		$('#login-container-modal').modal('hide');
		$('#account-form-container').modal('show');
	});

	// singup
	$('#btn-join').click(function() {
		$('#account-form-container').modal('show');
	});
	
	// redirect to homepage on new account creation, add short delay so user can
	// read alert window //
	/*$('.modal-alert #ok').click(function() {
		setTimeout(function() {
			window.location.href = '/';
		}, 300);
	});*/

	// already a member, back to login //
	$('#account-form-btn1').click(function() {
		$('#account-form-container').modal('hide');
		$('#login-container-modal').modal('show');
	});

	// handle account deletion //
	$('.modal-confirm .submit').click(function() {
		that.deleteAccount();
	});

	this.deleteAccount = function() {
		$('.modal-confirm').modal('hide');
		var that = this;
		$
				.ajax({
					url : '/delete',
					type : 'POST',
					data : {
						id : $('#userId').val()
					},
					success : function(data) {
						that
								.showLockedAlert('Your account has been deleted.<br>Redirecting you back to the homepage.');
					},
					error : function(jqXHR) {
						console.log(jqXHR.responseText + ' :: '
								+ jqXHR.statusText);
					}
				});
	}

	this.attemptLogout = function() {
		var that = this;
		$
				.ajax({
					url : "/home",
					type : "POST",
					data : {
						logout : true
					},
					success : function(data) {
						that
								.showLockedAlert('You are now logged out.<br>Redirecting you back to the homepage.');
					},
					error : function(jqXHR) {
						console.log(jqXHR.responseText + ' :: '
								+ jqXHR.statusText);
					}
				});
	}

	this.showLockedAlert = function(msg) {
		$('.modal-alert').modal({
			show : false,
			keyboard : false,
			backdrop : 'static'
		});
		$('.modal-alert .modal-header h3').text('Success!');
		$('.modal-alert .modal-body p').html(msg);
		$('.modal-alert').modal('show');
		$('.modal-alert button').click(function() {
			window.location.href = '/';
		})
		setTimeout(function() {
			window.location.href = '/';
		}, 3000);
	}
}

HomeController.prototype.onUpdateSuccess = function() {
	$('.modal-alert').modal({
		show : false,
		keyboard : true,
		backdrop : true
	});
	$('.modal-alert .modal-header h3').text('Success!');
	$('.modal-alert .modal-body p').html('Your account has been updated.');
	$('.modal-alert').modal('show');
	$('.modal-alert button').off('click');
}
