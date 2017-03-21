/**
 * Created by Gaurav MphRx on 3/21/2017.
 */

angular.module('dataStore', []).factory("DataService", function () {

    var XebiaCart = function (cartName) {
        this.cartName = cartName;
        this.clearCart = false;
        this.checkoutParameters = {};
        this.items = [];

        this.loadItems();

        var self = this;

        $(window).on("unload", function () {
            if (self.clearCart) {
                self.clearItems();
            }
            self.saveItems();
            self.clearCart = false;
        })
        
    }

    XebiaCart.prototype.loadItems = function () {
        var items = localStorage != null ? localStorage[this.cartName + "_items"] : null;
        if (items != null && JSON != null) {
            try {
                var items = JSON.parse(items);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.id != null && item.name != null && item.price != null && item.quantity != null) {
                        item = new CartItem(item.id, item.name, item.price, item.quantity);
                        this.items.push(item);
                    }
                }
            }
            catch (err) {
                // ignore errors while loading...
            }
        }
    }

    XebiaCart.prototype.saveItems = function () {
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName + "_items"] = JSON.stringify(this.items);
        }
    }

    XebiaCart.prototype.addItem = function (id, name, price, quantity) {
        quantity = this.toNumber(quantity);
        if (quantity != 0) {

            var found = false;
            for (var i = 0; i < this.items.length && !found; i++) {
                var item = this.items[i];
                if (item.id == id) {
                    found = true;
                    item.quantity = this.toNumber(item.quantity + quantity);
                    if (item.quantity <= 0) {
                        this.items.splice(i, 1);
                    }
                }
            }

            if (!found) {
                var item = new CartItem(id, name, price, quantity);
                this.items.push(item);
            }

            this.saveItems();
        }
    }

    XebiaCart.prototype.getTotalPrice = function (id) {
        var total = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (id == null || item.id == id) {
                total += this.toNumber(item.quantity * item.price);
            }
        }
        return total;
    }

    XebiaCart.prototype.getTotalCount = function (id) {
        var count = 0;
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (id == null || item.id == id) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;
    }

    XebiaCart.prototype.clearItems = function () {
        this.items = [];
        this.saveItems();
    }

    XebiaCart.prototype.toNumber = function (value) {
        value = value * 1;
        return isNaN(value) ? 0 : value;
    }

    XebiaCart.prototype.getItem = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id)
                return this.items[i];
        }
        return null;
    }


    var Product = function (id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    var CartItem = function (id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price * 1;
        this.quantity = quantity * 1;
    }


    var Store = function () {
        this.products = [
            new Product(1, "Fridge", "Get your beer colder!", 200),
            new Product(2, "TV", "Watch the match!", 9000),
            new Product(3, "Car", "Drive your way!", 1200000),
            new Product(4, "Phone", "Call the closer", 10000),
            new Product(5, "Laptop", "For all good things", 50000),
        ];
    }
    Store.prototype.getProduct = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id)
                return this.products[i];
        }
        return null;
    }


    var cart = new XebiaCart("PersonalCart");
    var store = new Store();

    return {
        store: store,
        cart: cart
    };

})