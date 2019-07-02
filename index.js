$(document).ready(function(){
    var $logo = $("#logo");
    var $container = $("#container");
    var $footer = $("#footer");
	var $body = $("body");

	var result = ($body.height() - $logo.height() - $footer.height());
	$container.css("height", result);
    
    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', 'login/login.html');
        }
    })
});