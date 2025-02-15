const newItem = document.getElementById("new-item");
const itemList = document.getElementById("item-list");
const form = document.querySelector("form");
const deleteItem = document.getElementById("removed");

newItem.addEventListener("input", () => {
    console.log(newItem.value);
});

function getItems() {
    return JSON.parse(localStorage.getItem("items")) || [];
}

function saveItems(items) {
    localStorage.setItem("items", JSON.stringify(items));
}

function renderList() {
    itemList.innerHTML = ""; // Limpa a lista antes de renderizar

    getItems().forEach(text => {
        const li = document.createElement("li");
        li.className = "flex items-center justify-between bg-white p-4 rounded";

        li.innerHTML = `
            <div class="flex items-center">
                <input type="checkbox" class="mr-2">
                <label>${text}</label>
            </div>
            <img src="includes/imgs/button.svg" width="30" alt="Deletar" class="delete-btn cursor-pointer">
        `;

        itemList.appendChild(li);

        li.querySelector(".delete-btn").addEventListener("click", () => {
            if (confirm("Deseja mesmo deletar?")) {
                li.remove();
    
                deleteItem.classList.add("block"); // Mostra o elemento
                deleteItem.classList.remove("hidden"); // Caso tenha 'hidden', remove
    
                // Esconde o elemento após 2 segundos
                setTimeout(() => {
                    deleteItem.classList.add("hidden"); // Oculta novamente
                }, 2000);
            }
        });
    });
}

function removeItem(text) {
    let items = getItems();
    items = items.filter(item => item !== text);
    saveItems(items);
    renderList();
}

form.onsubmit = (e) => {
    e.preventDefault();
    const text = newItem.value.trim();
    if (text === "") return; // Evita adicionar itens vazios

    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-white p-4 rounded";

    li.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" class="mr-2">
            <label>${text}</label>
        </div>
        <img src="includes/imgs/button.svg" width="30" alt="Deletar" class="delete-btn cursor-pointer">
    `;

    itemList.appendChild(li);
    newItem.value = "";

    const items = getItems();
    items.push(text);
    saveItems(items);
    li.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("Deseja mesmo deletar?")) {
            li.remove();
            removeItem(text);

            deleteItem.classList.add("block");
            deleteItem.classList.remove("hidden");

            setTimeout(() => {
                deleteItem.classList.add("hidden");
            }, 1000);
        }
    });
};
renderList();