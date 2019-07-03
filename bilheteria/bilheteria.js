$(document).ready(function(){
    // SETA ALTURA DO CONTAINER CENTRAL
    var $logo = $("#logo");
    var $container = $("#container");
    var $footer = $("#footer");
	var $body = $("body");
	var result = ($body.height() - $logo.height() - $footer.height());
	$container.css("height", result);

    var serverURL = 'http://localhost:3000/bilheterias';
    var $tcorpo = $("#tcorpo");
    var $modalVender = $("#modalVender");

    function addVenda(venda, emcartaz, filmes, tipoingresso){
        $tcorpo.append("<tr><th scope='row'>" + venda.id + "</th><td>" + emcartaz.id + "</td><td>" + filmes.titulo + "</td><td>" + tipoingresso.id +
        "</td><td>" + tipoingresso.descricao + "</td><td>" + venda.quantidade + "</td><td><button type='button' class='apagar btn btn-danger' data-id='"+ venda.id + "'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,venda){
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:3000/emcartaz/' + venda.emcartaz_id,
                    success: function(dataEmCartaz){
                        $.ajax({
                            type: 'GET',
                            url: 'http://localhost:3000/filmes/' + dataEmCartaz.filme_id,
                            success: function(dataFilmes){
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://localhost:3000/tipoingresso/' + venda.tipoingresso_id,
                                    success: function(dataTipoIngresso){
                                        addVenda(venda, dataEmCartaz, dataFilmes, dataTipoIngresso);                  
                                    }
                                });
                            }
                        });
                    }         
                });
            });
        },
    });

    // APAGAR
    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        if(confirm("Você realmente deseja apagar essa venda?")){
            $.ajax({
                type: 'DELETE',
                url: serverURL + "/" + $(this).attr("data-id"),
                success: function(){
                    alert("Venda removida com sucesso");
                    $tr.fadeOut(300, function(){
                        $(this).remove();
                    });
                }
            });
        }
    });
   
    // VENDER
    
    $modalVender.delegate(".vender","click",function(){
        var addIdEmCartaz = document.querySelector("#inputAddIdEmCartaz");
        var addIdTipoIngresso = document.querySelector("#inputAddIdTipoIngresso");
        var addQuantidade = document.querySelector("#inputAddQuantidade");
        var erro = false;
        if (addIdEmCartaz.value == '' || addIdEmCartaz.value == null) {
            addIdEmCartaz.classList.add('border-danger');
            erro = true;
        } else {
            addIdEmCartaz.classList.remove('border-danger');
            addIdEmCartaz.classList.add('border-success');
        }
        if (addIdTipoIngresso.value == '' || addIdTipoIngresso.value == null) {
            addIdTipoIngresso.classList.add('border-danger');
            erro = true;
        } else {
            addIdTipoIngresso.classList.remove('border-danger');
            addIdTipoIngresso.classList.add('border-success');
        }
        if (addQuantidade.value == '' || addQuantidade.value == null || addQuantidade.value < 1) {
            addQuantidade.classList.add('border-danger');
            erro = true;
        } else {
            addQuantidade.classList.remove('border-danger');
            addQuantidade.classList.add('border-success');
        }
        if(erro){
            return;
        }
        else{
            var venda = {
                emcartaz_id: addIdEmCartaz.value,
                tipoingresso_id: addIdTipoIngresso.value,
                quantidade: addQuantidade.value
            };
            addIdEmCartaz.classList.remove('border-success');
            addIdTipoIngresso.classList.remove('border-success');
            addQuantidade.classList.remove('border-success');

            $.ajax({ // Checagem de assentos
                type: 'GET',
                url: 'http://localhost:3000/emcartaz/' + venda.emcartaz_id,
                success: function(dataEmCartaz){
                    $.ajax({ // Checagem de assentos
                        type: 'GET',
                        url: 'http://localhost:3000/tipoingresso/' + venda.tipoingresso_id,
                        success: function(tipo){
                            if(dataEmCartaz.ativo != "Sim"){
                                alert("Filme Inativo");
                                return;
                            }
                            if(dataEmCartaz.restante - venda.quantidade >=0){
                                    var lotEmCartz = {
                                    filme_id: dataEmCartaz.filme_id,
                                    sala_id: dataEmCartaz.sala_id,
                                    horario: dataEmCartaz.horario,
                                    ativo: dataEmCartaz.ativo,
                                    restante: dataEmCartaz.restante - venda.quantidade,
                                };
                                $.ajax({
                                    url: 'http://localhost:3000/emcartaz/' + venda.emcartaz_id,
                                    type: 'PUT',    
                                    data: lotEmCartz,
                                    success: function(response){
                                        $.ajax({ // Venda efetiva
                                            type: 'POST',
                                            url: serverURL,
                                            data: venda,
                                            success: function(vendaData){
                                                $.ajax({
                                                    type: 'GET',
                                                    url: 'http://localhost:3000/emcartaz/' + vendaData.emcartaz_id,
                                                    success: function(cartaz){
                                                        $.ajax({
                                                            type: 'GET',
                                                            url: 'http://localhost:3000/filmes/' + cartaz.filme_id,
                                                            success: function(dataFilmes){
                                                                $.ajax({
                                                                    type: 'GET',
                                                                    url: 'http://localhost:3000/tipoingresso/' + vendaData.tipoingresso_id,
                                                                    success: function(dataTipoIngresso){
                                                                        addVenda(vendaData, cartaz, dataFilmes, dataTipoIngresso); 
                                                                        $("#modalVender").modal('hide');
                                                                        alert("Venda adicionada com sucesso");  
                                                                        addIdEmCartaz.value = '';
                                                                        addIdTipoIngresso.value = '';
                                                                        addQuantidade.value = '';
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }         
                                        });
                                    }
                                });
                            }
                            else{
                                alert("Ingressos esgotados para essa sala. Disponíveis:" + dataEmCartaz.restante);
                                return;
                            }
                        },
                        error: function(){
                            alert("Tipo de ingresso inexistente");
                            return;
                        }
                    });
                },
                error: function(){
                    alert("Filme inexistente");
                    return;
                }
            });
        }
    })

    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});