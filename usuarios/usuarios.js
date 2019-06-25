$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    function addUsuario(usuario){
        $tcorpo.append("<tr><th scope='row'>" + usuario.id +"</th><td>"+ usuario.usuario+"</td><td>"+ usuario.senha+
        "<td><button type='button' class='alterar btn btn-warning' data-id='"+usuario.id+
        "' data-toggle='modal' data-target='#modalAlterar'>Alterar senha</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +usuario.id+"'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,usuario){
                addUsuario(usuario);
            })
        },
    });

    // APAGAR
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

    // EDITAR - WTF PQ NÂO ABRE O MODAL
    $(".alterar").click(function(enviar){
        enviar.preventDefault();
        var editSenha = document.querySelector("#inputEditSenha");
        
        if (editSenha.value == '' || editSenha.value == null) {
            editSenha.classList.add('border-danger');
        } else {
            editSenha.classList.remove('border-danger');
            editSenha.value == '';
            var user = {
                usuario: $(this).attr("data-id"),
                senha: editSenha.value,
            };
            console.log($(this).attr("data-id"));
            // ^ ^ parei aq
        }
        /*
        $.ajax({
            url: serverURL + "/" + $(this).attr("data-id"),
            type: 'PUT',    
            data: user,
            success: function(response) {
                console.log(response);
                alert("Senha alterada com sucesso");
                location.reload();
            }
        });*/
    });
    
    // ADICIONAR
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