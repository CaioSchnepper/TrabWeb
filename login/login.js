$(document).ready(function(){
    var serverURL = 'http://localhost:3000/usuarios';
    var usuario = document.querySelector("#usuario");
    var senha = document.querySelector("#senha");
    var cadNome = document.querySelector("#inputNome");
    var cadSenha = document.querySelector("#inputSenha");

    $("#entrar").click(function(enviar){
        var erro = false;
        if (usuario.value == '' || usuario.value == null) {
            usuario.classList.add('border-danger');
            erro = true;
        } else {
            usuario.classList.remove('border-danger');
            usuario.classList.add('border-success');
        }
        if (senha.value == '' || senha.value == null) {
            senha.classList.add('border-danger');
            erro = true;
        } else {
            senha.classList.remove('border-danger');
            senha.classList.add('border-success');
        }
        if(erro){
            return;
        }
        usuario.value = '';
        $(location).attr('href', '../index.html');
    });
    $("#formCadastro").on('submit', function(form){
        form.preventDefault();
        var erro = false;
        if (cadNome.value == '' || cadNome.value == null) {
            cadNome.classList.add('border-danger');
            erro = true;
        } else {
            cadNome.classList.remove('border-danger');
            cadNome.classList.add('border-success');
        }
        if (cadSenha.value == '' || cadSenha.value == null) {
            cadSenha.classList.add('border-danger');
            erro = true;
        } else {
            cadSenha.classList.remove('border-danger');
            cadSenha.classList.add('border-success');
        }
        if(erro){
            return;
        }
        var user = {
            usuario: cadNome.value,
            senha: cadSenha.value,
        };

        $.ajax({
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
        });
    });
});