var Size = class Size {
    constructor(size="", image="", price=0) {
        this.size = size;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Size.name;
    }

    getLiteralName(){
        return "Tamanhos";
    }
}

var Flavor = class Flavor {
    constructor(flavor="", image="", price="") {
        this.flavor = flavor;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Flavor.name;
    }

    getLiteralName(){
        return "Sabores";
    }
}

var Drink = class Drink {
    constructor(drink="", image="", price="") {
        this.drink = drink;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Drink.name;
    }

    getLiteralName(){
        return "Bebidas";
    }
}