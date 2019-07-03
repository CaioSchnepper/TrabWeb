$(document).ready(function(){
    // SETA ALTURA DO CONTAINER CENTRAL
    var $logo = $("#logo");
    var $container = $("#container");
    var $footer = $("#footer");
	var $body = $("body");
	var result = ($body.height() - $logo.height() - $footer.height());
	$container.css("height", result);

    var serverURL = 'http://localhost:3000/filmes';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    var $inputAddGenero = $("#inputAddGenero");
    var $inputEditGenero = $("#inputEditGenero");
    var genre;

    function addFilme(filme,genero){
        $tcorpo.append("<tr><th scope='row'>" + filme.id +"</th><td class='genre' data-id='"+ genero.id +"'>"+ genero.genero +"</td>"+
        "<td class='titulo .text-wrap'>"+filme.titulo+"<td class='ano'>"+filme.ano_lancamento+"</td>"+
        "<td class='idioma'>"+filme.idioma+"</td><td class='duracao'>"+filme.duracao+"</td>"+"<td class='sinopse .text-wrap'>"+filme.sinopse+
        "<td class='poster'><a class='poster_link' target='_blank' href='"+filme.poster_link+"'>Link</a></td><td class='trailer'><a class='trailer_link' target='_blank' href='"+filme.trailer_link+"'>Link</a></td>"+
        "<td><button type='button' class='editarFilme btn btn-warning' data-id='"+filme.id+
        "'>Alterar</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +filme.id+"'>Apagar</button></td></tr>");
    }

    $("#close_btn").click(function(){
        $($inputEditGenero).empty();
    })

    function addGenero(genero){
        $inputAddGenero.append("<option value='" + genero.id + "'>"+ genero.genero +"</option");
    }

    function editGenero(genero){
        $inputEditGenero.append("<option value='" + genero.id + "'>"+ genero.genero +"</option");
    }

    // CARREGAR GENEROS
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/generos",
        success: function(data){
            genre = data;
            executar();
        },
    }); 

    function executar(){
        for(let j in genre){
            addGenero(genre[j]);
        }
        $.ajax({
            type: 'GET',
            url: serverURL,
            success: function(data){
                $.each(data, function(i,filme){
                    for(j in genre){
                        if(genre[j].id == filme.genero_id){
                            addFilme(filme,genre[j]);
                            break;
                        }
                    }
                })
            },
        });

        // APAGAR
        $tcorpo.delegate(".apagar","click",function(){
            var $tr = $(this).closest("tr");
            if(confirm("Você realmente deseja deletar esse filme?")){
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
        $tcorpo.delegate(".editarFilme","click",function(){
            var linha = this.parentNode.parentNode;
            var editGenre = document.querySelector("#inputEditGenero");
            var editTitle = document.querySelector("#inputEditTitulo");
            var editAno = document.querySelector("#inputEditLancamento");
            var editIdioma = document.querySelector("#inputEditIdioma");
            var editDuracao = document.querySelector("#inputEditDuracao");
            var editSinopse = document.querySelector("#inputEditSinopse");
            var editPoster = document.querySelector("#inputEditPoster");
            var editTrailer = document.querySelector("#inputEditTrailer");
            editGenre.textContent = linha.querySelector('.genre').textContent;
            editTitle.value = linha.querySelector('.titulo').textContent;
            editAno.value = linha.querySelector('.ano').textContent;
            editIdioma.value = linha.querySelector('.idioma').textContent;
            editDuracao.value = linha.querySelector('.duracao').textContent;
            editSinopse.value = linha.querySelector('.sinopse').textContent;
            editPoster.value = $(linha.querySelector('.poster').firstChild).attr("href");
            editTrailer.value = $(linha.querySelector('.trailer').firstChild).attr("href");
            $inputEditGenero.append("<option selected value='" + $(linha.querySelector('.genre')).attr("data-id") + "'>"+ linha.querySelector('.genre').textContent +"</option>");
            for(let j in genre){
                if($(linha.querySelector('.genre')).attr("data-id") == genre[j].id){
                    continue;
                }
                else{
                    editGenero(genre[j]);
                }
            }
            
            $modalAlterar.modal('show');
            $formAlterar.on('submit', function(form){
                form.preventDefault();
                form.stopImmediatePropagation();
                var erro = false;
                if (editGenre.value == '' || editGenre.value == null) {
                    editGenre.classList.add('border-danger');
                    erro = true;
                } else{
                    editGenre.classList.remove('border-danger');
                    editGenre.classList.add('border-success');
                }
                if (editTitle.value == '' || editTitle.value == null) {
                    editTitle.classList.add('border-danger');
                    erro = true;
                } else{
                    editTitle.classList.remove('border-danger');
                    editTitle.classList.add('border-success');
                }
                if (editAno.value == '' || editAno.value == null) {
                    editAno.classList.add('border-danger');
                    erro = true;
                } else{
                    editAno.classList.remove('border-danger');
                    editAno.classList.add('border-success');
                }
                if (editIdioma.value == '' || editIdioma.value == null) {
                    editIdioma.classList.add('border-danger');
                    erro = true;
                } else{
                    editIdioma.classList.remove('border-danger');
                    editIdioma.classList.add('border-success');
                }
                if (editDuracao.value == '' || editDuracao.value == null) {
                    editDuracao.classList.add('border-danger');
                    erro = true;
                } else{
                    editDuracao.classList.remove('border-danger');
                    editDuracao.classList.add('border-success');
                }
                if (editSinopse.value == '' || editSinopse.value == null) {
                    editSinopse.classList.add('border-danger');
                    erro = true;
                } else{
                    editSinopse.classList.remove('border-danger');
                    editSinopse.classList.add('border-success');
                }
                if (editPoster.value == '' || editPoster.value == null) {
                    editPoster.classList.add('border-danger');
                    erro = true;
                } else{
                    editPoster.classList.remove('border-danger');
                    editPoster.classList.add('border-success');
                }
                if (editTrailer.value == '' || editTrailer.value == null) {
                    editTrailer.classList.add('border-danger');
                    erro = true;
                } else{
                    editTrailer.classList.remove('border-danger');
                    editTrailer.classList.add('border-success');
                }
                if(erro){
                    return;
                }else{
                    editPoster.value = editPoster.value.replace('https://',"");
                    editTrailer.value = editTrailer.value.replace('https://',"");
                    editPoster.value = editPoster.value.replace('http://',"");
                    editTrailer.value = editTrailer.value.replace('http://',"");
                    $(linha.querySelector('.poster_link')).attr("href","https://"+editPoster.value);
                    $(linha.querySelector('.trailer_link')).attr("href","https://"+editTrailer.value);

                    var movie = {
                        genero_id: editGenre.value,
                        titulo: editTitle.value,
                        ano_lancamento: editAno.value,
                        idioma: editIdioma.value,
                        duracao: editDuracao.value,
                        sinopse: editSinopse.value,
                        poster_link: "https://"+ editPoster.value,
                        trailer_link: "https://"+ editTrailer.value,
                    };
                    $.ajax({
                        url: serverURL + "/" + linha.firstChild.textContent,
                        type: 'PUT',    
                        data: movie,
                        success: function(response) {
                            alert("Filme alterado com sucesso");
                            editGenre.classList.remove('border-success');
                            editTitle.classList.remove('border-success');
                            editAno.classList.remove('border-success');
                            editIdioma.classList.remove('border-success');
                            editDuracao.classList.remove('border-success');
                            editSinopse.classList.remove('border-success');
                            editPoster.classList.remove('border-success');
                            editTrailer.classList.remove('border-success');
                            linha.querySelector('.genre').textContent = $("#inputEditGenero").find(":selected").text();
                            $(linha.querySelector('.genre')).attr("data-id",response.genero_id);
                            linha.querySelector('.titulo').textContent = editTitle.value;
                            linha.querySelector('.ano').textContent = editAno.value;
                            linha.querySelector('.idioma').textContent = editIdioma.value;
                            linha.querySelector('.duracao').textContent = editDuracao.value;
                            linha.querySelector('.sinopse').textContent = editSinopse.value;

                            editTitle.value = '';
                            editAno.value = '';
                            editIdioma.value = '';
                            editDuracao.value = '';
                            editSinopse.value = '';
                            editPoster.value = '';
                            editTrailer.value = '';
                            $($inputEditGenero).empty();
                            $modalAlterar.modal('hide');
                        }
                    });
                }
            });
        });
    
        // ADICIONAR
        $modalAdicionar.delegate(".adicionar","click",function(){
            var addGenre = document.querySelector("#inputAddGenero");
            var addTitle = document.querySelector("#inputAddTitulo");
            var addAno = document.querySelector("#inputAddLancamento");
            var addIdioma = document.querySelector("#inputAddIdioma");
            var addDuracao = document.querySelector("#inputAddDuracao");
            var addSinopse = document.querySelector("#inputAddSinopse");
            var addPoster = document.querySelector("#inputAddPoster");
            var addTrailer = document.querySelector("#inputAddTrailer");
            var erro = false;
            if (addGenre.value == '' || addGenre.value == null) {
                addGenre.classList.add('border-danger');
                erro = true;
            } else{
                addGenre.classList.remove('border-danger');
                addGenre.classList.add('border-success');
            }
            if (addTitle.value == '' || addTitle.value == null) {
                addTitle.classList.add('border-danger');
                erro = true;
            } else{
                addTitle.classList.remove('border-danger');
                addTitle.classList.add('border-success');
            }
            if (addAno.value == '' || addAno.value == null) {
                addAno.classList.add('border-danger');
                erro = true;
            } else{
                addAno.classList.remove('border-danger');
                addAno.classList.add('border-success');
            }
            if (addIdioma.value == '' || addIdioma.value == null) {
                addIdioma.classList.add('border-danger');
                erro = true;
            } else{
                addIdioma.classList.remove('border-danger');
                addIdioma.classList.add('border-success');
            }
            if (addDuracao.value == '' || addDuracao.value == null) {
                addDuracao.classList.add('border-danger');
                erro = true;
            } else{
                addDuracao.classList.remove('border-danger');
                addDuracao.classList.add('border-success');
            }
            if (addSinopse.value == '' || addSinopse.value == null) {
                addSinopse.classList.add('border-danger');
                erro = true;
            } else{
                addSinopse.classList.remove('border-danger');
                addSinopse.classList.add('border-success');
            }
            if (addPoster.value == '' || addPoster.value == null) {
                addPoster.classList.add('border-danger');
                erro = true;
            } else{
                addPoster.classList.remove('border-danger');
                addPoster.classList.add('border-success');
            }
            if (addTrailer.value == '' || addTrailer.value == null) {
                addTrailer.classList.add('border-danger');
                erro = true;
            } else{
                addTrailer.classList.remove('border-danger');
                addTrailer.classList.add('border-success');
            }

            if(erro){
                return;
            }else{
                var genreName;
                for(j in genre){
                    if(genre[j].id == addGenre.value){
                        genreName = genre[j];
                        break;
                    }
                }
                addPoster.value = addPoster.value.replace('https://',"");
                addTrailer.value = addTrailer.value.replace('https://',"");
                var movie = {
                    genero_id: addGenre.value,
                    titulo: addTitle.value,
                    ano_lancamento: addAno.value,
                    idioma: addIdioma.value,
                    duracao: addDuracao.value,
                    sinopse: addSinopse.value,
                    poster_link: "https://"+ addPoster.value,
                    trailer_link: "https://"+ addTrailer.value,
                };
                addGenre.classList.remove('border-success');
                addTitle.classList.remove('border-success');
                addAno.classList.remove('border-success');
                addIdioma.classList.remove('border-success');
                addDuracao.classList.remove('border-success');
                addSinopse.classList.remove('border-success');
                addPoster.classList.remove('border-success');
                addTrailer.classList.remove('border-success');
                addGenre.value = '';
                addTitle.value = '';
                addAno.value = '';
                addIdioma.value = '';
                addDuracao.value = '';
                addSinopse.value = '';
                addPoster.value = '';
                addTrailer.value = '';
                $.ajax({
                    type: 'POST',
                    url: serverURL,
                    data: movie,
                    success: function(adicionar){
                        $("#modalAdicionar").modal('hide');
                        addFilme(adicionar,genreName);
                        alert("Filme adicionado com sucesso");
                    }
                });
            }
        });
    }
    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});