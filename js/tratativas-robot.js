var get_size_data = 
    [["Grande (45cm)"], ["Médio (30cm)"], ["Pequeno (20cm)"]];
var get_flavors_data = 
    [["Quatro queijos"], ["Calabresa"], ["Tomate seco"], ["Banana Nevada"], ["Prestígio"]];
var get_drink_data = 
    [["Suco de laranja"], ["Suco de morango"], ["Coca-cola"], ["Pepsi-cola"], ["Caipirinha"]];

var sizes = [];
var size1 = new Size("Grande (45cm)", "teste.jpg", 40.99);    
var size2 = new Size("Médio (30cm)", "teste.jpg", 29.99);    
var size3 = new Size("Pequeno (20cm)", "teste.jpg", 20.99);
sizes = [size1, size2, size3];

var flavors = [];
var flavor1 = new Flavor("Quatro queijos", "teste.jpg", 40.99);    
var flavor2 = new Flavor("Calabresa", "teste.jpg", 29.99);    
var flavor3 = new Flavor("Tomate seco", "teste.jpg", 29.99);    
var flavor4 = new Flavor("Banana nevada", "teste.jpg", 29.99);    
var flavor5 = new Flavor("Prestígio", "teste.jpg", 29.99);    
flavors = [flavor1, flavor2, flavor3, flavor4, flavor5];

var drinks = [];
var drink1 = new Drink("Suco de laranja", "teste.jpg", 4.99);   
var drink2 = new Drink("Suco de morango", "teste.jpg", 4.99);   
var drink3 = new Drink("Coca-cola", "teste.jpg", 9.99);   
var drink4 = new Drink("Fanta uva", "teste.jpg", 7.99);   
var drink5 = new Drink("Caipirinha", "teste.jpg", 5.99);   
drinks = [drink1, drink2, drink3, drink4, drink5];

function getDataByKey(key)
{
    var data = [];
    switch (key) {
        case "get_pizza":
            data = show_itens_order();
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
                option += '<option value="'+id+'">' + item + '</option>';
    
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