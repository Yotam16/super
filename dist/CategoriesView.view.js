import { onCategoryPressed } from "./CategoriesView.controller.js";
var categoriesList = [
    { name: "All", img_url: "/assets/categories/meat.png" },
    { name: "Meat", img_url: "/assets/categories/meat.png" },
    { name: "Dairy", img_url: "/assets/categories/milk.png" },
    { name: "Vegetables", img_url: "/assets/categories/veggies.png" },
    { name: "Fruit", img_url: "/assets/categories/veggies.png" },
    { name: "Bread", img_url: "/assets/categories/bread.png" },
    { name: "Hygene", img_url: "/assets/categories/cleaning.png" },
    { name: "Office", img_url: "/assets/categories/office.webp" },
    { name: "Clothing", img_url: "/assets/categories/clothes.webp" },
];
var DATA_CATEGORY_NAME = "data-category-name";
var categoriesView = document.querySelector(".category-list");
export function showCategoriesView() {
    categoriesView.innerHTML = "\n        " + categoriesList.map(renderCategory).join("\n") + "\n    ";
    var categoryButtons = categoriesView.querySelectorAll(".category-list__category");
    categoryButtons.forEach(function (categoryButton) {
        categoryButton.addEventListener("click", function (event) {
            var categoryPressed = categoryButton.getAttribute(DATA_CATEGORY_NAME);
            if (!categoryPressed)
                throw new Error("OnCategorySelected - No such category " + categoriesList);
            onCategoryPressed(validateRecievedCategory(categoryPressed));
        });
    });
}
function validateRecievedCategory(categoryToValidate) {
    var foundCategory = categoriesList.find(function (category) { return category.name === categoryToValidate; });
    if (!foundCategory)
        throw new Error(" " + categoryToValidate + " is not a category");
    return foundCategory.name;
}
function renderCategory(category) {
    return "\n        <li class=\"category-list__category\" " + DATA_CATEGORY_NAME + " = \"" + category.name + "\">\n            <img src=\"" + category.img_url + "\n            \" alt=\"\" class=\"category-list__image\">\n            <h4 class=\"category-list__title\">" + category.name + "</h4>\n        </li>\n    ";
}
