$(document).ready(function(){
    // SETA ALTURA DO CONTAINER CENTRAL
    var $logo = $("#logo");
    var $container = $("#container");
    var $footer = $("#footer");
	var $body = $("body");
	var result = ($body.height() - $logo.height() - $footer.height());
	$container.css("height", result);

    var serverURL = 'http://localhost:3000/generos';
    var $tcorpo = $("#tcorpo");
    var $modalAdicionar = $("#modalAdicionar");
    var $modalAlterar = $("#modalAlterar");
    var $formAlterar = $("#formAlterar");
    function addGenero(genero){
        $tcorpo.append("<tr><th scope='row'>" + genero.id +"</th><td class='genre'>"+ genero.genero+"</td><td>"+
        "<button type='button' class='editarGenero btn btn-warning' data-id='"+genero.id+
        "'>Alterar</button></td><td><button type='button' class='apagar btn btn-danger' data-id='"
        +genero.id+"'>Apagar</button></td></tr>");
    }
    
    // CARREGAR 
    $.ajax({
        type: 'GET',
        url: serverURL,
        success: function(data){
            $.each(data, function(i,genero){
                addGenero(genero);
            })
        },
    });

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

    //SAIR
    $('#sair').click(function(){
        if(confirm("Você realmente deseja sair?")){
            $(location).attr('href', '../login/login.html');
        }
    })
});