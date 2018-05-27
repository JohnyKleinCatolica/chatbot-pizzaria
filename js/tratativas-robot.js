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
            option += '<option value="0"> Escolha </option>';

            data.forEach(function(item, index)
            {
                id = index+1;
                option += '<option value="'+id+'">' + item.name + '</option>';
    
            });
            option += "</select>";
            
        } else {
            data.forEach(function(item, index)
            {
                option2 = "<select class='show-options op-"+entity[index]+"'>";
                option2 += '<option value="0"> Escolha </option>';

                id = index+1;
                data[index].forEach(function(item2, index2)
                {
                    idItem = index2+1;
                    option2 += '<option value="'+idItem+'">' + item2.name + '</option>';
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
        item[0] = getWordNotFormated(item[0]);

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
    var itens_order = [];
    itens_order[0] = getOptionSelected(".op-get_size");
    itens_order[1] = getOptionSelected(".op-get_drink");
    itens_order[2] = getOptionSelected(".op-get_flavors");

    return itens_order;
}

function getOptionSelected(classe){
    var option = "";
    var value = $(classe).val();
    var forGetHtml = classe + " option[value='"+value+"']";
    option = $(forGetHtml).html();

    return option;
}

function getOrder(){
    var itens = getItensOrder();

    itens.forEach(function(item){
        if(item==null || item=="" || $.trim(item)=="Escolha"){
            alert("Sem " + item + " selecionado");
        } else {
            alert(item + " selecionado");
        }
    });
}