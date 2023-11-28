export type Category = "Meat" | "Dairy" | "Vegetables" | "Fruit" | "Bread" | "Hygene" |
    "Office" | "Clothing" | "Other";

export type Product = {

    name: string;
    PID: number;
    cat: Category;
    price: number;
    inStock: boolean;
    pic_path: string;
}

export type Cart = {

    userID: number;
    products: Product[];
    total: number;
}

export function addToCart(product: Product, cart: Cart): Cart {

    if (product.inStock) {

        cart.products.push(product);
        cart.total += product.price;
    } else {

        console.log(`Product ${product.name} is not in stock.`);
    }

    return cart;
}

export function newCart(uid: number): Cart {

    const cart: Cart = { userID: uid, products: [], total: 0 };
    return cart;
}

export function removeFromCart(product: Product, cart: Cart, quantity: number): Cart {

    const pid = product.PID;

    for (let i = 0; i < cart.products.length; i++) {

        if (pid === cart.products[i].PID) {

            cart.products.splice(i, 1);
            quantity -= 1;

            if (0 === quantity) {

                console.log('removeFromCart: success');
                return cart;
            }
        }
    }

    console.log('removeFromCart: item(S) not found; returning the best cart possible');
    return cart;
}


export async function getProductbyID(pid: number): Promise<Product | undefined> {
    const filePath = "./product_list.json";

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }

        const productList: Product[] = await response.json();

        return productList.find(product => product.PID === pid);
    } catch (error) {
        console.error("Error reading product list:", error);
        return undefined;
    }
}

export async function getProductByName(name: string): Promise<Product | undefined> {
    const filePath = "./product_list.json";

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status: ${response.status}`);
        }

        const productList: Product[] = await response.json();

        return productList.find(product => product.name === name);
    } catch (error) {
        console.error("Error reading product list:", error);
        return undefined;
    }
}


export async function getAllProducts(): Promise<Product[] | undefined> {
    const filePath = "./product_list.json";

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch product list. Status: ${response.status}`);
        }

        const productList: Product[] = await response.json();

        return productList;
    } catch (error) {
        console.error("Error reading product list from file:", error);
        return undefined;
    }
}

export function reloadCart(cart: Cart) { //????

    return cart;
}

