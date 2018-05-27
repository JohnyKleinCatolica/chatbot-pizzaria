var Size = class Size {
    constructor(name="", image="", price=0) {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Size.name;
    }

    getLiteralName(){
        return "Tamanho";
    }

    getPronomes(){
        return "o";
    }
}

var Flavor = class Flavor {
    constructor(name="", image="", price="") {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Flavor.name;
    }

    getLiteralName(){
        return "Sabor";
    }

    getPronomes(){
        return "o";
    }
}

var Drink = class Drink {
    constructor(name="", image="", price="") {
        this.name = name;
        this.image = image;
        this.price = price;
    }

    getClassName() {
        return Drink.name;
    }

    getLiteralName(){
        return "Bebida";
    }

    getPronomes(){
        return "a";
    }
}