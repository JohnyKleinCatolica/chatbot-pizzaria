function getInitialSalution()
{
    return "<li class='rsp-robot'>Faça seu pedido, estou pronto para lhe antender!</li>";
}
$("#msgs_chat").html(getInitialSalution());

function getDataByKey(key)
{
    var data = new Array();
    switch (key) {
        case "get_pizza":
            data = show_itens_order();
            break;
        case "get_size":
            data = sizes;
            break;
        case "get_flavors":
            data = flavors;
            break;
        case "get_drink":
            data = drinks;
            break;
        default :
            break;
    }
    return data;
}

function getItemDataByKey(entity, index){
    var itens = getDataByKey(entity);

    return itens[index-1];
}

function getResponseFromDB(tipo) 
{
    var response = "";
    var data = getDataByKey(tipo);
    
    if (tipo=="get_pizza") { 
        response = show_options(data, ["get_size", "get_flavors", "get_drink"], true);
    } else {
        response = show_options(data, tipo);
    }
    
    return response;
}

function show_itens_order()
{
    var options_data = new Array();
    options_data [0] = getDataByKey("get_size");
    options_data [1] = getDataByKey("get_flavors");
    options_data [2] = getDataByKey("get_drink");

    return options_data;
}   

function show_options(data, entity, isMatriz=false) 
{
    var option = "";
    var option2 = "";
    var id = 0;
    var idItem = 0;
    
    if (data.length > 0) {

        if (isMatriz==false){
            option = "<select class='show-options op-"+entity+"'>";
            option += '<option value="0" data-entity="'+entity+'" name="'+data[0].getLiteralName()+'">Escolha '+ data[0].getPronomes() + ': ' + data[0].getLiteralName() + '</option>';
 
            data.forEach(function(item, index)
            {
                id = index+1;
                option += '<option value="'+id+'" data-entity="'+entity+'" name="'+item.getLiteralName()+'">' + item.name + '</option>';
    
            });
            option += "</select>";
            
        } else {
            data.forEach(function(item, index)
            {
                option2 = "<select class='show-options op-"+entity[index]+"'>";
                option2 += '<option value="0" data-entity="'+entity[index]+'" name="'+item[0].getLiteralName()+'">Escolha ' + item[0].getPronomes() + ': ' + item[0].getLiteralName() + '</option>';

                id = index+1;
                data[index].forEach(function(item2, index2)
                {
                    idItem = index2+1;
                    option2 += '<option value="'+idItem+'" data-entity="'+entity[index]+'" name="'+item2.getLiteralName()+'">' + item2.name + '</option>';
                });
                
                option2 += "</select>";
                option += option2;

            });
        }
    }

    return option;
}

function is_data_inDB(entity) 
{
    var verification = false;

    if(entity == "get_pizza" || entity == "get_size" || entity == "get_flavors" || entity == "get_drink") {
        verification = true;
    }

    return verification;
}

function get_index_option_inDB(text, data)
{
    var index_search = 0;
    var index = 0;
    /*text = $.isArray(text) ? "" : getWordNotFormated(text);

    data.forEach(function(item, i)
    {
        item[0] = getWordNotFormated(item[0].name);

        var item_div = item[0].split(" ");
        
        item_div.forEach(function(item_word)
        {
            index_search = text.search(item_word);

            if(index_search != -1) {
                index = i+1;
            }
        });

    });*/
    
    return index;
}

function getItensOrder()
{
    var itens_order = new Array();
    itens_order[0] = getOptionSelected(".op-get_size");
    itens_order[1] = getOptionSelected(".op-get_flavors");
    itens_order[2] = getOptionSelected(".op-get_drink");

    return itens_order;
}

function getOptionSelected(classe)
{
    var option = "";
    var objOption = new Array();
    var value = $(classe).val();
    var forGetValue = classe + " option[value='"+value+"']";
    var index_escolha = -1;
    var data_entity = $(forGetValue).attr("data-entity");

    option = $(forGetValue).html();
    index_escolha = option.indexOf("Escolha");

    if(index_escolha == -1) {
        objOption = getItemDataByKey(data_entity, value);
    }

    return objOption;
}

function getNamesItens()
{
    var names_itens = new Array();
    names_itens[0] = getNameSelected(".op-get_size");
    names_itens[1] = getNameSelected(".op-get_flavors");
    names_itens[2] = getNameSelected(".op-get_drink");
    
    names_itens[0] = names_itens[0]==null ? "tamanho" : names_itens[0].toLowerCase();
    names_itens[1] = names_itens[1]==null ? "sabor" : names_itens[1].toLowerCase();
    names_itens[2] = names_itens[2]==null ? "bebida" : names_itens[2].toLowerCase();
    
    return names_itens;
}


function getNameSelected(classe){
    var name = "";
    var forGetHtml = classe + " option[value='0']";
    name = $(forGetHtml).attr("name");

    return name;
}

function getOrder(){
    var itens = getItensOrder();
    var names = getNamesItens();
    var itensOrder = new Array();
    
    itens.forEach(function(item, index){
        if (item==null || item=="") {
            if (obrigatory_item(names[index])){
                alert("O(a) " + names[index] + " é obrigatório!");
            }
        } else {
            itensOrder.push(item);
        }
    });

    if (itensOrder.length >= 2) {
        finishOrder(itensOrder);
    }
}

function obrigatory_item(item){
    var obrigatory = false;
    item = item==null ? "" : item.toLowerCase();

    if (item == "sabor" || item == "tamanho"){
        obrigatory = true;
    }
    return obrigatory;
}

function finishOrder(itensOrder) {
    var valorTotal = 0;
    var itens = ""; 
    $("#modalSale").modal("show");
    $("#modalTitle").html("Pedido Efetuado!");

    itensOrder.forEach(function(item){
        itens += "<h4>" + item.getLiteralName() + " - " + item.name + "</h4>";
        valorTotal += item.price;
    });
    
    itens += "<img src='img/produtos/" + itensOrder[1].image + "'/>";
    itens += "<h3>Valor total - R$" + valorTotal.toFixed(2) + "</h3>";
    
    $("#modalBody").html(itens);
}

function showValueProducts(entity) {
    var option = new Array();
    var resposta = "";

    $(".show-options").on("change", function(){
        option = getOptionSelected(".op-" + entity);
        resposta = "Valor d" + option.getPronomes() + " " + option.getLiteralName() +" é " + option.price;
    });

    if (resposta!=""){
        $("#msgs_chat").html("<li class='rsp-robot'>" + respota + "</li>");
    }
}