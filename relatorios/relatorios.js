$(document).ready(function(){
    var serverURL = 'http://localhost:3000/relatorios';

    function addRelatorio(relatorio){

    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,relatorio){
                addRelatorio(relatorio);
            })
        },
    });

    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});