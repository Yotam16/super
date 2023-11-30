import { onCategoryPressed } from "./CategoriesView.controller.js";
import { Category } from "./Product.model.js";

type CategoryView = {
    name: Category,
    img_url: string
}

const categoriesList: CategoryView[] = [
    { name: "All", img_url: "/super/assets/categories/all.png" },
    { name: "Meat", img_url: "/super/assets/categories/meat.png" },
    { name: "Dairy", img_url: "/super/assets/categories/milk.png" },
    { name: "Vegetables", img_url: "/super/assets/categories/veggies.png" },
    { name: "Fruit", img_url: "/super/assets/categories/veggies.png" },
    { name: "Bread", img_url: "/super/assets/categories/bread.png" },
    { name: "Hygene", img_url: "/super/assets/categories/cleaning.png" },
    { name: "Office", img_url: "/super/assets/categories/office.webp" },
    { name: "Clothing", img_url: "/super/assets/categories/clothes.webp" },
];

const DATA_CATEGORY_NAME = "data-category-name";
const categoriesView = document.querySelector(".category-list") as HTMLUListElement;


export function showCategoriesView() {

    categoriesView.innerHTML = `
        ${categoriesList.map(renderCategory).join("\n")}
    `;

    const categoryButtons = categoriesView.querySelectorAll(".category-list__category");

    categoryButtons.forEach((categoryButton) => {
        categoryButton.addEventListener("click", (event) => {
            const categoryPressed = categoryButton.getAttribute(DATA_CATEGORY_NAME);
            if (!categoryPressed) throw new Error(`OnCategorySelected - No such category ${categoriesList}`);
            onCategoryPressed(validateRecievedCategory(categoryPressed));
        })
    });

}

function validateRecievedCategory(categoryToValidate: string): Category {
    const foundCategory = categoriesList.find((category) => category.name === categoryToValidate);

    if (!foundCategory) throw new Error(` ${categoryToValidate} is not a category`);

    return foundCategory.name;
}

function renderCategory(category: CategoryView) {
    return `
        <li class="category-list__category" ${DATA_CATEGORY_NAME} = "${category.name}">
            <img src="${category.img_url}
            " alt="" class="category-list__image">
            <h4 class="category-list__title">${category.name}</h4>
        </li>
    `;
}