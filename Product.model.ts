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

    if (!product) throw new Error(`getProduct - couldn't find product with id ${productId}`)

    return product;
}

export function getProductbyName(name: string) {
    const product = products.find((product) => product.name === name);

    if (!product) throw new Error(`getProduct - couldn't find product with id ${name}`)

    return product;
}

export function setProducts(newProducts: Product[]) {
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


// document.getElementById('getProductByIdButton')?.addEventListener('click', () => {
//     try {
//         const userInput = prompt('Enter product ID:');
//         if (userInput !== null && userInput !== undefined) {
//             const productId = parseInt(userInput, 10);
//             const product = getProductbyID(productId);
//             console.log('Product by ID:', product);
//         } else {
//             console.log('User canceled or dismissed the prompt.');
//         }
//     } catch (error) {
//         console.log('error getting product by ID');
//     }
// });

// document.getElementById('getProductByNameButton')?.addEventListener('click', () => {
//     try {
//         const productName = prompt('Enter product name:');
//         if (productName !== null && productName !== undefined) {
//             const product = getProductbyName(productName);
//             console.log('Product by Name:', product);
//         } else {
//             console.log('User canceled or dismissed the prompt.');
//         }
//     } catch (error) {
//         console.log('error getting product by name');
//     }
// });
