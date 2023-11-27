type category_t = "Meat" | "Dairy" |  "Vegetables" | "Fruit" | "Bread" | "Hygene" | 
                                                    "Office" | "Clothing" | "Other";


type product_t = {

    name: string;
    PID: number;
    cat: category_t;
    price: number;
    inStock: boolean;
    pic_path: string;
}

type cart_t = {

    userID: number;
    products: product_t[];
    total: number;
}

function addToCart(product: product_t, cart: cart_t): cart_t {

    if (product.inStock) {
        
        cart.products.push(product);
        cart.total += product.price;
    } else {
        
        console.log(`Product ${product.name} is not in stock.`);
    }

    return cart;
}








