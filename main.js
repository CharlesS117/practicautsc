$(function() {
var app_id = '2667318313330971';
var scopes = 'email, user_friends, user_online_presence';

var btn_login = '<a href="#" id="login" class="btn btn-primary">Iniciar seción</a>'; 

var div_session = "<div id = 'facebook-session'>";+
				  "<strong></strong>"+
				  "<img>"+
				  "a href='#' id='logout' class='btn btn-danger'>Cerrar sesión</a>"	
				  "</div>";


window.fbAsyncInit = function() {
	FB.init({
		appID 	: 	app_id,
		status 	: 	true,
		cookie 	: 	true,
		xfbml 	: 	true,
		version 	: 	'v2.1'
	});

	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, function(){
	});
  });
};

var statusChangeCallback = function(response, callback) {
	console.log(response);

	if (response.status === 'connected') {
		getFacebookData();
	}else {
		callback(false);
	}

}

var checkLoginState = function(callback){
	FB.getLoginStatus(function(response) {
		statusChangeCallback(response, function(data) {
			callback(data);
	});
  });
}

var getFacebookData = function(){
	FB.api('/me', function(response) {
		$('#login').after(div_session);
		$('#login').remove();
		$('#facebook-session strong').text("Bienvenido: "+response.name);
		$('#facebook-session img').attr('src','https://graph.facebook'+response.id+'piture?type=large'); 
	});
}

var facebookLogin = function() {
	checkLoginState(function(response) {
		if (!response) {
			FB.login(function(response) {
				if (response.status === 'connected')
					getFacebookData();
			}, {scope: scopes});
		}
	})
}

var facebookLogout = function(){
	checkLoginState(function(response) {
		if (response.status === 'connected') {
			FB.logout(function(response) {
				$('#facebook-session').before(btn_login);
				$('#facebook-session').remove();
			}
		}
	}
}

$(document).on('click', 'login', function(e) {
	e.preventDefault();

	facebookLogin();
}

$(document).on('click', 'logout', function(e) {
	e.preventDefault();
	
	if (confirm("¿Esta seguro?"))
		facebookLogout();
	else
		return false;
}
})