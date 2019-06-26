$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    function addUsuario(usuario){
        $tcorpo.append("<tr><th scope='row'>" + usuario.id +"</th><td class='user'>"+ usuario.usuario+"</td><td class='senha'>"+ usuario.senha+
        "<td><button type='button' class='editarSenha btn btn-warning' data-id='"+usuario.id+
        "'>Alterar senha</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
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

    // EDITAR
    $tcorpo.delegate(".editarSenha","click",function(){
        var linha = this.parentNode.parentNode;
        $modalAlterar.modal('show');
        
        $formAlterar.on('submit', function(form){
            form.preventDefault();
            form.stopImmediatePropagation();
            var editSenha = document.querySelector("#inputEditSenha");
        
            if (editSenha.value == '' || editSenha.value == null) {
                editSenha.classList.add('border-danger');
                return;
            } else {
                var user = {
                    usuario: linha.querySelector('.user').textContent, 
                    senha: editSenha.value,
                };
                $.ajax({
                    url: serverURL + "/" + linha.firstChild.textContent,
                    type: 'PUT',    
                    data: user,
                    success: function(response) {
                        console.log(response);
                        alert("Senha alterada com sucesso");
                        linha.querySelector('.senha').textContent = editSenha.value;
                        editSenha.classList.remove('border-danger');
                        editSenha.value = '';
                        $modalAlterar.modal('hide');
                    }
                });
            }
        }); 
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

    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});