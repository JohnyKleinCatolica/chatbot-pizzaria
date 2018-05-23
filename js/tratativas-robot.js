var get_size_data = ["Grande(45cm), Médio (30cm), Pequeno(20cm)"];
var get_flavors_data = ["Quatro queijos, Calabresa, Tomate seco, Banana Nevada, Prestígio"];
var get_drink_data = ["Suco de laranja, Suco de morango, Coca-cola, Pepsi-cola, Caipirinha"];

function getResponseFromDB(tipo) 
{
    var response = "";

    switch (tipo) {
        case "get_pizza":
            response = check_pizza_order();
            break;
        case "get_size":
            response = get_inDB(get_size_data);
            break;
        case "get_flavors":
            response = get_inDB(get_flavors_data);
            break;
        case "get_drink":
            response = get_inDB(get_drink_data);
            break;
    }
    
    return response;
}

function check_pizza_order()
{
    return "Pedido realizado!";
}

function get_inDB(menu) 
{
    return menu;
}

function is_data_inDB(entity) 
{
    var verification = false;

    if(entity == "get_pizza" || entity == "get_size" || entity == "get_flavors" || entity == "get_drink") {
        verification = true;
    }

    return verification;
}