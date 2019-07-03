$(document).ready(function(){
    var serverURL = 'http://localhost:3000/salas';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    function addSala(sala){
        $tcorpo.append("<tr><th scope='row'>" + sala.id +"</th><td class='lot_max'>"+ sala.lotacao_maxima+"</td><td>"+
        "<button type='button' class='editarLot btn btn-warning' data-id='"+sala.id+
        "'>Alterar</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +sala.id+"'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,sala){
                addSala(sala);
            })
        },
    });

    // APAGAR
    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        if(confirm("Você realmente deseja deletar essa sala?")){
            $.ajax({
                type: 'DELETE',
                url: serverURL + "/" + $(this).attr("data-id"),
                success: function(){
                    alert("Sala removida com sucesso");
                    $tr.fadeOut(300, function(){
                        $(this).remove();
                    });
                }
            });
        }
    });

    // EDITAR
    $tcorpo.delegate(".editarLot","click",function(){
        var linha = this.parentNode.parentNode;
        $modalAlterar.modal('show');
        
        $formAlterar.on('submit', function(form){
            form.preventDefault();
            form.stopImmediatePropagation();
            var editLot = document.querySelector("#inputEditLotacao");
        
            if (editLot.value == '' || editLot.value == null) {
                editLot.classList.add('border-danger');
                return;
            } else {
                var lot = {
                    lotacao_maxima: editLot.value,
                };
                $.ajax({
                    url: serverURL + "/" + linha.firstChild.textContent,
                    type: 'PUT',    
                    data: lot,
                    success: function(response) {
                        alert("Lotação alterada com sucesso");
                        linha.querySelector('.lot_max').textContent = editLot.value;
                        editLot.classList.remove('border-danger');
                        editLot.value = '';
                        $modalAlterar.modal('hide');
                    }
                });
            }
        }); 
    });
   
    // ADICIONAR
    $modalAdicionar.delegate(".adicionar","click",function(){
        var addLotacao = document.querySelector("#inputAddLotacao");
        if (addLotacao.value == '' || addLotacao.value == null) {
            addLotacao.classList.add('border-danger');
            return;
        } else {
            addLotacao.classList.remove('border-danger');
            addLotacao.classList.add('border-success');
            var nSala = {
                lotacao_maxima: addLotacao.value,
            };
            addLotacao.classList.remove('border-success');
            $.ajax({
                type: 'POST',
                url: serverURL,
                data: nSala,
                success: function(adicionar){
                    $("#modalAdicionar").modal('hide');
                    addSala(adicionar);
                    alert("Sala adicionada com sucesso");  
                    addLotacao.value = '';
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