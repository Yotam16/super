export type category_t = "Meat" | "Dairy" |  "Vegetables" | "Fruit" | "Bread" | "Hygene" | 
                                                    "Office" | "Clothing" | "Other";

export type product_t = {

    name: string;
    PID: number;
    cat: category_t;
    price: number;
    inStock: boolean;
    pic_path: string;
}

export type cart_t = {

    userID: number;
    products: product_t[];
    total: number;
}

export function addToCart(product: product_t, cart: cart_t): cart_t {

    if (product.inStock) {
        
        cart.products.push(product);
        cart.total += product.price;
    } else {
        
        console.log(`Product ${product.name} is not in stock.`);
    }

    return cart;
}

export function newCart(uid: number): cart_t {
    
    const cart: cart_t = { userID: uid, products: [], total: 0 };
    return cart;
}

export function removeFromCart(product: product_t,  cart: cart_t, quantity: number): cart_t {

    const pid = product.PID;

    for (let i = 0; i < cart.products.length; i++) {
       
        if (pid === cart.products[i].PID) {  
            
            cart.products.splice(i, 1);
            quantity -=1;

            if (0 === quantity) {

                console.log('removeFromCart: success');
                return cart;
            }
        }
    }

    console.log('removeFromCart: item(S) not found; returning the best cart possible');
    return cart;
}


export async function getProductbyID(pid: number): Promise<product_t | undefined> {
    const filePath = "./product_list.json";

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }

        const productList: product_t[] = await response.json();

        return productList.find(product => product.PID === pid);
    } catch (error) {
        console.error("Error reading product list:", error);
        return undefined;
    }
}

export async function getProductByName(name: string): Promise<product_t | undefined> {
    const filePath = "./product_list.json";

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }

        const productList: product_t[] = await response.json();

        return productList.find(product => product.name === name);
    } catch (error) {
        console.error("Error reading product list:", error);
        return undefined;
    }
}


export async function getAllProducts(): Promise<product_t[] | undefined> {
    const filePath = "./product_list.json";

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch product list. Status: ${response.status}`);
        }

        const productList: product_t[] = await response.json();

        return productList;
    } catch (error) {
        console.error("Error reading product list from file:", error);
        return undefined;
    }
}

export function reloadCart(cart: cart_t) { //????

    return cart; 
}

