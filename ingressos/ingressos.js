$(document).ready(function(){
    // SETA ALTURA DO CONTAINER CENTRAL
    var $logo = $("#logo");
    var $container = $("#container");
    var $footer = $("#footer");
	var $body = $("body");
	var result = ($body.height() - $logo.height() - $footer.height());
	$container.css("height", result);

    var serverURL = 'http://localhost:3000/tipoingresso';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    function addIngresso(ingresso){
        $tcorpo.append("<tr><th scope='row'>" + ingresso.id +"</th><td class='ticket'>"+ ingresso.descricao+"</td><td class='valor'>"+ ingresso.valor+
        "<td><button type='button' class='editarTipo btn btn-warning' data-id='"+ingresso.id+
        "'>Alterar tipo</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +ingresso.id+"'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,ingresso){
                addIngresso(ingresso);
            })
        },
    });

    // APAGAR
    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        if(confirm("Você realmente deseja deletar esse tipo de ingresso?")){
            $.ajax({
                type: 'DELETE',
                url: serverURL + "/" + $(this).attr("data-id"),
                success: function(){
                    alert("Tipo de ingresso removido com sucesso");
                    $tr.fadeOut(300, function(){
                        $(this).remove();
                    });
                }
            });
        }
    });

    // EDITAR
    $tcorpo.delegate(".editarTipo","click",function(){
        var linha = this.parentNode.parentNode;
        $modalAlterar.modal('show');
        
        $formAlterar.on('submit', function(form){
            form.preventDefault();
            form.stopImmediatePropagation();
            var editTipo = document.querySelector("#inputEditTipo");
        
            if (editTipo.value == '' || editTipo.value == null) {
                editTipo.classList.add('border-danger');
                return;
            } else {
                var ticket = {
                    descricao: editTipo.value,
                    valor: linha.querySelector('.valor').textContent, 
                };
                $.ajax({
                    url: serverURL + "/" + linha.firstChild.textContent,
                    type: 'PUT',    
                    data: ticket,
                    success: function(response) {
                        alert("Tipo de ingresso alterado com sucesso");
                        linha.querySelector('.ticket').textContent = editTipo.value;
                        editTipo.classList.remove('border-danger');
                        editTipo.value = '';
                        $modalAlterar.modal('hide');
                    }
                });
            }
        }); 
    });
   
    // ADICIONAR
    $modalAdicionar.delegate(".adicionar","click",function(){
        var addTipo = document.querySelector("#inputAddTipo");
        var addValor = document.querySelector("#inputAddValor");
        var erro = false;
        if (addTipo.value == '' || addTipo.value == null) {
            addTipo.classList.add('border-danger');
            erro = true;
        } else {
            addTipo.classList.remove('border-danger');
            addTipo.classList.add('border-success');
        }
        if (addValor.value == '' || addValor.value == null) {
            addValor.classList.add('border-danger');
            erro = true;
        } else {
            addValor.classList.remove('border-danger');
            addValor.classList.add('border-success');
        }
        if(erro){
            return;
        }
        else{
            var ticket = {
                descricao: addTipo.value,
                valor: addValor.value,
            };
            addTipo.classList.remove('border-success');
            addValor.classList.remove('border-success');
            $.ajax({
                type: 'POST',
                url: serverURL,
                data: ticket,
                success: function(adicionar){
                    $("#modalAdicionar").modal('hide');
                    addIngresso(adicionar);
                    alert("Ingresso adicionado com sucesso");  
                    addTipo.value = '';
                    addValor.value = '';
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