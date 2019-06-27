$(document).ready(function(){
    var serverURL = 'http://localhost:3000/emcartaz';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");

    function addCartaz(emcartaz){
        $tcorpo.append("<tr><th scope='row'>" + emcartaz.id + "</th><td class='sala_id'>" + emcartaz.sala_id + "</td><td class='filme_id'>"
        + emcartaz.filme_id + "</td><td>" + "titulo" + "</td><td class='horario'>" + emcartaz.horario + 
        "</td><td>Sim/Não</td><td><button type='button' class='editarIdFilme btn btn-warning'>Alterar dados</button></td><td><button type='button' class='apagar btn btn-danger' data-id='" + emcartaz.id + "'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,emcartaz){
                addCartaz(emcartaz);
            })
        },
    });

    // APAGAR
    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        if(confirm("Você realmente deseja deletar esse filme em cartaz?")){
            $.ajax({
                type: 'DELETE',
                url: serverURL + "/" + $(this).attr("data-id"),
                success: function(){
                    alert("Filme removido com sucesso");
                    $tr.fadeOut(300, function(){
                        $(this).remove();
                    });
                }
            });
        }
    });

    // EDITAR
    $tcorpo.delegate(".editarIdFilme","click",function(){
        var linha = this.parentNode.parentNode;
        $modalAlterar.modal('show');
        
        $formAlterar.on('submit', function(form){
            form.preventDefault();
            form.stopImmediatePropagation();
            var editIdFilme = document.querySelector("#inputEditIdFilme");
        
            if (editIdFilme.value == '' || editIdFilme.value == null) {
                editIdFilme.classList.add('border-danger');
                return;
            } else {
                var filme = {
                    filme_id: editIdFilme.value,
                    sala_id: linha.querySelector('.sala_id').textContent,
                    horario: linha.querySelector('.horario').textContent,
                };
                $.ajax({
                    url: serverURL + "/" + linha.firstChild.textContent,
                    type: 'PUT',    
                    data: filme,
                    success: function(response) {
                        alert("Filme alterado com sucesso");
                        linha.querySelector('.filme_id').textContent = editIdFilme.value;
                        editIdFilme.classList.remove('border-danger');
                        editIdFilme.value = '';
                        $modalAlterar.modal('hide');
                    }
                });
            }
        }); 
    });
   
    // ADICIONAR
    $modalAdicionar.delegate(".adicionar","click",function(){
        var addSala = document.querySelector("#inputAddSala");
        var addIdFilme = document.querySelector("#inputAddIdFilme");
        var addHorario = document.querySelector("#inputAddHorario");
        var erro = false;

        if (addSala.value == '' || addSala.value == null) {
            addSala.classList.add('border-danger');
            erro = true;
        } else {
            addSala.classList.remove('border-danger');
            addSala.classList.add('border-success');
        }
        if (addIdFilme.value == '' || addIdFilme.value == null) {
            addIdFilme.classList.add('border-danger');
            erro = true;
        } else {
            addIdFilme.classList.remove('border-danger');
            addIdFilme.classList.add('border-success');
        }
        if (addHorario.value == '' || addHorario.value == null) {
            addHorario.classList.add('border-danger');
            erro = true;
        } else {
            addHorario.classList.remove('border-danger');
            addHorario.classList.add('border-success');
        }
        if(erro){
            return;
        }
        else{
            var filme = {
                sala_id: addSala.value,
                filme_id: addIdFilme.value,
                horario: addHorario.value,
            };
            addSala.classList.remove('border-success');
            addIdFilme.classList.remove('border-success');
            addHorario.classList.remove('border-success');
            $.ajax({
                type: 'POST',
                url: serverURL,
                data: filme,
                success: function(adicionar){
                    $("#modalAdicionar").modal('hide');
                    addCartaz(adicionar);
                    alert("Filme adicionado com sucesso");  
                    addSala.value = '';
                    addIdFilme.value = '';
                    addHorario.value = '';
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