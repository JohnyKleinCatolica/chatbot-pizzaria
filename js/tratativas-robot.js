var get_size_data = 
    [["Grande (45cm)"], ["Médio (30cm)"], ["Pequeno (20cm)"]];
var get_flavors_data = 
    [["Quatro queijos"], ["Calabresa"], ["Tomate seco"], ["Banana Nevada"], ["Prestígio"]];
var get_drink_data = 
    [["Suco de laranja"], ["Suco de morango"], ["Coca-cola"], ["Pepsi-cola"], ["Caipirinha"]];

function getResponseFromDB(tipo) 
{
    var response = "";

    switch (tipo) {
        case "get_pizza":
            response = check_pizza_order();
            break;
        case "get_size":
            response = show_options(get_size_data);
            break;
        case "get_flavors":
            response = show_options(get_flavors_data);
            break;
        case "get_drink":
            response = show_options(get_drink_data);
            break;
    }
    
    return response;
}

function check_pizza_order()
{
    return "Pedido realizado!";
}

function show_options(data) 
{
    option = "";
    
    if (data.length > 0) {
        option = "<select id='show-options'>";

        data.forEach(function(item)
        {
            option += '<option value="' + item + '">' + item + '</option>';
        });

        option += "</select>";
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