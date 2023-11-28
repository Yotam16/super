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


type OnProductsLoaded = (products: Product[]) => void;

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

