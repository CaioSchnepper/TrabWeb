$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var $tcorpo = $("#tcorpo");
    function addUsuario(usuario){
        $tcorpo.append("<tr><th scope='row'>" + usuario.id +"</th><td>"+ usuario.usuario+"</td><td>"+ usuario.senha+"<td><button type='button' class='alterar btn btn-warning' data-id'"+usuario.id+"'data-toggle='modal' data-target='#modalAlterar'>Alterar senha</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"+usuario.id+"'>Apagar</button></td></tr>");
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

   $tcorpo.delegate(".editar","click",function(){
        var editSenha = document.querySelector("#inputEditSenha");
        var nomeUser = $(this).closest("tr");
        console.log(nomeUser);
        var user = {
            usuario: "a",
            senha: editSenha.value,
        };
 /*       $.ajax({
            type: 'POST',
            url: serverURL,
            data: user,
            success: function(novoUsuario){
                alert("Usuário criado com sucesso!");
                $("#modalCadastrar").modal('hide');
            },
            error: function(){
                alert("Erro ao criar usuário");
            }
        });*/
    });
});