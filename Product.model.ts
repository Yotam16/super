export type Category = "Meat" | "Dairy" | "Vegetables" | "Fruit" | "Bread" | "Hygene" |
    "Office" | "Clothing" | "Other";

export type ProductId = string;
export type Product = {
    name: string;
    PID: ProductId;
    cat: Category;
    price: number;
    inStock: boolean;
    pic_path: string;
}

export const products = [] as Product[];

export function getProducts(): Product[] {
    return products.slice();
}

export function getProductbyID(productId: string) {
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
