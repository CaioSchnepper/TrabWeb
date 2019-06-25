$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");

    function addUsuario(usuario){
        $tcorpo.append("<tr><th scope='row'>" + usuario.id +"</th><td>"+ usuario.usuario+"</td><td>"+ usuario.senha+
        "<td><button type='button' class='btn btn-warning' data-id'"+usuario.id+
        "' data-toggle='modal' data-target='#modalAlterar'>Alterar senha</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
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
        if(confirm("Você realmente deseja deletar esse usuário?")){
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
        }
    });

    // WTF PQ NÂO ABRE O MODAL
   $modalAlterar.delegate(".alterar","click",function(){
        var user = {
            /*usuario: $(this).closest("td"),*/
            senha: (document.querySelector("#inputEditSenha")).value,
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
        var addUser = document.querySelector("#inputAddNome");
        var addSenha = document.querySelector("#inputAddSenha");
        var erro = false;
        if (addUser.value == '' || addUser.value == null) {
            addUser.classList.add('border-danger');
            erro = true;
        } else {
            addUser.classList.remove('border-danger');
            addUser.classList.add('border-success');
        }
        if (addSenha.value == '' || addSenha.value == null) {
            addSenha.classList.add('border-danger');
            erro = true;
        } else {
            addSenha.classList.remove('border-danger');
            addSenha.classList.add('border-success');
        }
        if(erro){
            return;
        }
        else{
            var user = {
                usuario: addUser.value,
                senha: addSenha.value,
            };
            addUser.classList.remove('border-success');
            addSenha.classList.remove('border-success');
            $.ajax({
                type: 'POST',
                url: serverURL,
                data: user,
                success: function(adicionar){
                    $("#modalAdicionar").modal('hide');
                    addUsuario(adicionar);
                    alert("Usuário adicionado com sucesso");  
                    addUser.value = '';
                    addSenha.value = '';
                }
            });
        }
    });
});