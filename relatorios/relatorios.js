$(document).ready(function(){
    var serverURL = 'http://localhost:3000/';
    var $ccorpo = $("#ccorpo");
    var $tcorpo = $("#tcorpo");
    var $thcorpo = $("#thcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var opcaoGET;

    function addData(dados){
        if (opcaoGET == "usuarios") {
            document.querySelector("#labelModal").textContent = "Lista de usuários";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.usuario +"</td><td>"+ dados.senha + "</td></tr>");
        } else if (opcaoGET == "generos") {
            document.querySelector("#labelModal").textContent = "Lista de gêneros dos filmes";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.genero +"</td></tr>");
        } else if (opcaoGET == "salas") {
            document.querySelector("#labelModal").textContent = "Lista de salas da unidade";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.lotacao_maxima +"</td></tr>");
        } else if (opcaoGET == "tipoingresso") {
            document.querySelector("#labelModal").textContent = "Lista de tipos dos ingressos";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.descricao +"</td><td>"+ dados.valor + "</td></tr>");
        } else if (opcaoGET == "filmes") {
            document.querySelector("#labelModal").textContent = "Lista de filmes";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.titulo +"</td><td>"+ dados.ano_lancamento + "</td></tr>");
        } else if (opcaoGET == "emcartaz") {
            document.querySelector("#labelModal").textContent = "Lista de filmes em cartaz";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.filme_id +"</td><td>"+ dados.sala_id + "</td><td>"+ dados.horario + "</td><td>"+ dados.ativo + "</td></tr>");
        } else if (opcaoGET == "bilheterias") {
            document.querySelector("#labelModal").textContent = "Lista de total de ingresso vendidos";
            $tcorpo.append("<tr><th scope='row'>" + dados.id +"</th><td>"+ dados.emcartaz_id +"</td><td>"+ dados.tipoingresso_id + "</td><td>"+ dados.quantidade + "</td></tr>");
        }
    }
    
    // CARREGAR
    function carregar(opcao) {
        $.ajax({
            type: 'GET',
            url: serverURL + opcao,
            success: function(data){
                $.each(data, function(i,dados){
                    addData(dados);
                })
            },
        });
    }

    // ADICIONAR
    $ccorpo.delegate(".adicionar","click",function(){
        opcaoGET = this.id;
        $modalAdicionar.modal({ // Previne fechar modal sem clicar no X;
    		backdrop: 'static',
    		keyboard: false
        });
        carregar(opcaoGET);
        if (opcaoGET == "usuarios") {
            document.querySelector("#labelModal").textContent = "Lista de usuários";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>Nome</th><th scope='col'>Senha</th>");
        } else if (opcaoGET == "generos") {
            document.querySelector("#labelModal").textContent = "Lista de gêneros dos filmes";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>Gênero</th>");
        } else if (opcaoGET == "salas") {
            document.querySelector("#labelModal").textContent = "Lista de salas da unidade";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>Lotação Máxima</th>");
        } else if (opcaoGET == "tipoingresso") {
            document.querySelector("#labelModal").textContent = "Lista de tipos dos ingressos";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>Descrição</th><th scope='col'>Valor</th>");
        } else if (opcaoGET == "filmes") {
            document.querySelector("#labelModal").textContent = "Lista de filmes";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>Título</th><th scope='col'>Ano de lançamento</th>");
        } else if (opcaoGET == "emcartaz") {
            document.querySelector("#labelModal").textContent = "Lista de filmes em cartaz";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>ID do Filme</th><th scope='col'>ID da Sala</th><th scope='col'>Horário</th><th scope='col'>Ativo</th>");
        } else if (opcaoGET == "bilheterias") {
            document.querySelector("#labelModal").textContent = "Lista de total de ingressos vendidos";
            $thcorpo.append("<th scope='col'>ID</th><th scope='col'>ID do filme em cartaz</th><th scope='col'>ID do tipo de ingresso</th><th scope='col'>Quantidade vendida</th>");
        }
        $modalAdicionar.modal('show');
    });

    // LIMPAR MODAL
    $('.close').click(function(){
        $tcorpo.empty();
        $thcorpo.empty();
    });

    // SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});