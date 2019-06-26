$(document).ready(function(){
    var serverURL = 'http://localhost:3000/filmes';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    var genero;
    function addFilme(filme){
        $tcorpo.append("<tr><th scope='row'>" + filme.id +"</th><td class='genre'>"+ "a"+"</td>"+
        "<td class='.text-wrap'>"+filme.titulo+"<td>"+filme.ano_lancamento+"</td>"+
        "<td>"+filme.idioma+"</td><td>"+filme.duracao+"</td>"+"<td class='.text-wrap'>"+filme.sinopse+
        "<td><a target='_blank' href='"+filme.poster_link+"'>Link</a></td><td><a target='_blank' href='"+filme.trailer_link+"'>Link</a></td>"+
        "<td><button type='button' class='editarFilme btn btn-warning' data-id='"+filme.id+
        "'>Alterar</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +filme.id+"'>Apagar</button></td></tr>");
    }

    // CARREGAR
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/generos",
        success: function(data){
            genero = data;
            console.log(genero);
            $.ajax({
                type: 'GET',
                url: serverURL,
                success: function(data2){
                    $.each(data2, function(i,filme){
                        addFilme(filme);
                    })
                },
            });
        },
    }); 
/*
    // APAGAR
    $tcorpo.delegate(".apagar","click",function(){
        var $tr = $(this).closest("tr");
        if(confirm("Você realmente deseja deletar esse gênero?")){
            $.ajax({
                type: 'DELETE',
                url: serverURL + "/" + $(this).attr("data-id"),
                success: function(){
                    alert("Gênero removido com sucesso");
                    $tr.fadeOut(300, function(){
                        $(this).remove();
                    });
                }
            });
        }
    });

    // EDITAR
    $tcorpo.delegate(".editarGenero","click",function(){
        var linha = this.parentNode.parentNode;
        $modalAlterar.modal('show');
        
        $formAlterar.on('submit', function(form){
            form.preventDefault();
            form.stopImmediatePropagation();
            var editGenero = document.querySelector("#inputEditGenero");
        
            if (editGenero.value == '' || editGenero.value == null) {
                editGenero.classList.add('border-danger');
                return;
            } else {
                var genre = { 
                    genero: editGenero.value,
                };
                $.ajax({
                    url: serverURL + "/" + linha.firstChild.textContent,
                    type: 'PUT',    
                    data: genre,
                    success: function(response) {
                        alert("Gênero alterado com sucesso");
                        linha.querySelector('.genre').textContent = editGenero.value;
                        editGenero.classList.remove('border-danger');
                        editGenero.value = '';
                        $modalAlterar.modal('hide');
                    }
                });
            }
        }); 
    });
 
    // ADICIONAR
    $modalAdicionar.delegate(".adicionar","click",function(){
        var addGenre = document.querySelector("#inputAddGenero");
        if (addGenre.value == '' || addGenre.value == null) {
            addGenre.classList.add('border-danger');
            return;
        } else {
            addGenre.classList.remove('border-danger');
            addGenre.classList.add('border-success');
            var genre = {
                genero: addGenre.value,
            };
            addGenre.classList.remove('border-success');
            $.ajax({
                type: 'POST',
                url: serverURL,
                data: genre,
                success: function(adicionar){
                    $("#modalAdicionar").modal('hide');
                    addGenero(adicionar);
                    alert("Gênero adicionado com sucesso");  
                    addGenre.value = '';
                }
            });
        }
    });
*/
    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});