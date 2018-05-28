function getDataByKey(key)
{
    var data = [];
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

function getResponseFromDB(tipo) 
{
    var response = "";
    var data = getDataByKey(tipo);
    
    response = 
        tipo=="get_pizza" ? 
            show_options(data, ["get_size", "get_flavors", "get_drink"], true) 
            : show_options(data, tipo);
    
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
            option += '<option value="0" name="'+data[0].getLiteralName()+'">Escolha '+ data[0].getPronomes() + ': ' + data[0].getLiteralName() + '</option>';
 
            data.forEach(function(item, index)
            {
                id = index+1;
                option += '<option value="'+id+'" name="'+item.getLiteralName()+'">' + item.name + '</option>';
    
            });
            option += "</select>";
            
        } else {
            data.forEach(function(item, index)
            {
                option2 = "<select class='show-options op-"+entity[index]+"'>";
                option2 += '<option value="0" name="'+item[0].getLiteralName()+'">Escolha ' + item[0].getPronomes() + ': ' + item[0].getLiteralName() + '</option>';

                id = index+1;
                data[index].forEach(function(item2, index2)
                {
                    idItem = index2+1;
                    option2 += '<option value="'+idItem+'" name="'+item2.getLiteralName()+'">' + item2.name + '</option>';
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
    text = $.isArray(text) ? "" : getWordNotFormated(text);

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

    });
    
    return index;
}

function getItensOrder()
{
    var itens_order = new Array();
    itens_order[0] = getOptionSelected(".op-get_size");
    itens_order[1] = getOptionSelected(".op-get_drink");
    itens_order[2] = getOptionSelected(".op-get_flavors");

    return itens_order;
}

function getOptionSelected(classe)
{
    var option = "";
    var value = $(classe).val();
    var forGetHtml = classe + " option[value='"+value+"']";
    option = $(forGetHtml).html();

    return option;
}

function getNamesItens()
{
    var names_itens = new Array();
    names_itens[0] = getNameSelected(".op-get_size");
    names_itens[1] = getNameSelected(".op-get_drink");
    names_itens[2] = getNameSelected(".op-get_flavors");
    
    names_itens[0] = names_itens[0]==null ? "tamanho" : names_itens[0].toLowerCase();
    names_itens[1] = names_itens[1]==null ? "bebida" : names_itens[1].toLowerCase();
    names_itens[2] = names_itens[2]==null ? "sabor" : names_itens[2].toLowerCase();
    
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
    var itensOrder = [];
    
    itens.forEach(function(item, index){
        var index_escolha = item==null ? -1 : item.indexOf("Escolha");
        if (item==null || item=="" || index_escolha==0) {
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
    console.log(itensOrder)
    alert("Compra finalizada!");
}