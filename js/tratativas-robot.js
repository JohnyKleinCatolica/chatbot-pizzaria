var get_size_data = ["Grande(45cm), Médio (30cm), Pequeno(20cm)"];
var get_flavors_data = ["Quatro queijos, Calabresa, Tomate seco, Banana Nevada, Prestígio"];
var get_drink_data = ["Suco de laranja, Suco de morango, Coca-cola, Pepsi-cola, Caipirinha"];

function getResponseFromDB(tipo) {
    switch (tipo) {
        case get_pizza:
            check_pizza_order();
            break;
        case get_size:
            get_inDB(get_size_data);
            break;
        case get_flavors:
            get_inDB(get_flavors_data);
            break;
        case get_drink:
            get_inDB(get_drink_data);
            break;
        default:
            alert("Segue os valores da base");
    }
}

function get_inDB(menu) {
    return menu;
}