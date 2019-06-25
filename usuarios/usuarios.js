$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");

    function addUsuario(usuario){
        $tcorpo.append("<tr><th scope='row'>" + usuario.id +"</th><td>"+ usuario.usuario+"</td><td>"+ usuario.senha+
        "<td><button type='button' class='btn btn-warning' data-id'"+usuario.id+
        "'data-toggle='modal' data-target='#modalAlterar'>Alterar senha</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +usuario.id+"'>Apagar</button></td></tr>");
    }
    
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,usuario){
                addUsuario(usuario);
            })
        },
    });

    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        
        $.ajax({
            type: 'DELETE',
            url: serverURL + "/" + $(this).attr("data-id"),
            success: function(){
                alert("Usuário removido com sucesso");
                $tr.fadeOut(300, function(){
                    $(this).remove();
                });
            }
        });
    });

    // WTF PQ NÂO ABRE O MODAL
   $modalAlterar.delegate(".alterar","click",function(){
        var user = {
            /*usuario: $(this).closest("td"),*/
            senha: editSenha = (document.querySelector("#inputEditSenha")).value,
        };

        $.ajax({
            url: serverURL + "/" + $(this).attr("data-id"),
            type: 'PUT',    
            data: JSON.stringify(user),
            success: function() {
                alert("Senha alterada com sucesso");
            }
        });
    });
    
    $modalAdicionar.delegate(".adicionar","click",function(){
        var user = {
            usuario: (document.querySelector("#inputAddNome")).value,
            senha: (document.querySelector("#inputAddSenha")).value,
        };

        $.ajax({
            type: 'POST',
            url: serverURL,
            data: user,
            success: function(adicionar){
                $("#modalAdicionar").modal('hide');
                addUsuario(adicionar);
                alert("Usuário adicionado com sucesso");  
                document.querySelector("#inputAddNome").value = '';
                document.querySelector("#inputAddSenha").value = '';
            }
        });
    });
});