var get_size_data = 
    [["Grande (45cm)"], ["Médio (30cm)"], ["Pequeno (20cm)"]];
var get_flavors_data = 
    [["Quatro queijos"], ["Calabresa"], ["Tomate seco"], ["Banana Nevada"], ["Prestígio"]];
var get_drink_data = 
    [["Suco de laranja"], ["Suco de morango"], ["Coca-cola"], ["Pepsi-cola"], ["Caipirinha"]];

function getDataByKey(key)
{
    var data = [];
    switch (key) {
        case "get_pizza":
            data = pizza_order();
            break;
        case "get_size":
            data = get_size_data;
            break;
        case "get_flavors":
            data = get_flavors_data;
            break;
        case "get_drink":
            data = get_drink_data;
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
    
    response = tipo=="get_pizza" ? show_options(data, tipo, true) : show_options(data, tipo);
    
    return response;
}

function pizza_order()
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
            option = "<select class='show-options sp-"+entity+"'>";
            option += '<option value="0"> Escolha </option>';

            data.forEach(function(item, index)
            {
                id = index+1;
                option += '<option value="'+id+'">' + item + '</option>';
    
            });
            option += "</select>";
            
        } else {
            data.forEach(function(item, index)
            {
                option2 = "<select class='show-options sp-"+entity+"'>";
                option2 += '<option value="0"> Escolha </option>';

                id = index+1;
                data[index].forEach(function(item2, index2)
                {
                    idItem = index2+1;
                    option2 += '<option value="'+idItem+'">' + item2 + '</option>';
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
    var word = "";
    text = getWordNotFormated(text);

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