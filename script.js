const newItem = document.getElementById("new-item");
const itemList = document.getElementById("item-list")
const form = document.querySelector("form");
const deleteItem = document.getElementById("removed");

newItem.addEventListener("input", () =>{
    console.log(newItem.value);
});

form.onsubmit = (e) => {
    e.preventDefault();
    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-white p-4 rounded";

    li.innerHTML = `
        <div class="flex items-center">
            <input type="checkbox" class="mr-2">
            <label>${newItem.value}</label>
        </div>
        <img src="includes/imgs/button.svg" width="30" alt="Deletar" class="delete-btn cursor-pointer">
    `;
    itemList.appendChild(li);
    newItem.value = "";
    li.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("Deseja mesmo deletar?")) {
            li.remove();

            deleteItem.classList.add("block"); 
            deleteItem.classList.remove("hidden");

            setTimeout(() => {
                deleteItem.classList.add("hidden"); 
            }, 1000);
        }
    });
};