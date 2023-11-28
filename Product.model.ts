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

export const products = [] as Product[];

// Create a list of targets who listens when products is changed
type OnProductChangedListener = (products: Product[]) => void;
export const onProductsChangedListeners = [] as OnProductChangedListener[];

// Add a target who listens to when products is changed
export function addOnProductsChangedListener(callback: OnProductChangedListener) {
    onProductsChangedListeners.push(callback);
}

// When products is changed, call all targets who listens.
export function OnProductsChanged(products: Product[]) {
    console.log("On Products Changed event fired.")
    onProductsChangedListeners.forEach((listener) => listener(products));
}

export function getProducts(): Product[] {
    return products.slice();
}

export function getProductbyID(productId: number) {
    const product = products.find((product) => product.PID === productId);
    
    if(!product) throw new Error(`getProduct - couldn't find product with id ${productId}`)

    return product;
}

export function populateProducts(newProducts: Product[]) {
    clearProducts();
    newProducts.forEach((product) => products.push(product));

    OnProductsChanged(products);
}

export function clearProducts() {
    products.splice(0);
}

type OnProductsLoaded = (loadedProducts: Product[]) => void;
export async function loadAllProducts(onLoadCallback: OnProductsLoaded) {
    const filePath = "./product_list.json";

    try {

        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch product list. Status: ${response.status}`);
        }

        const productList: Product[] = await response.json();
        onLoadCallback(productList);

    } catch (error) {
        throw new Error("Error reading product list from file:\n" + error);
    }
}





// export async function getProductbyID(pid: number): Promise<Product | undefined> {
    //     const filePath = "./product_list.json";
    
    //     try {
    //         const response = await fetch(filePath);
    
    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch the file. Status: ${response.status}`);
    //         }
    
    //         const productList: Product[] = await response.json();
    
    //         return productList.find(product => product.PID === pid);
    //     } catch (error) {
    //         console.error("Error reading product list:", error);
    //         return undefined;
    //     }
    // }
    
    // export async function getProductByName(name: string): Promise<Product | undefined> {
    //     const filePath = "./product_list.json";
    
    //     try {
    //         const response = await fetch(filePath);
    
    //         if (!response.ok) {
    //             throw new Error(`Failed to fetch the file. Status: ${response.status}`);
    //         }
    
    //         const productList: Product[] = await response.json();
    
    //         return productList.find(product => product.name === name);
    //     } catch (error) {
    //         console.error("Error reading product list:", error);
    //         return undefined;
    //     }
    // }