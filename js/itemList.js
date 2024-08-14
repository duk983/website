// itemList.js

async function addItem() {
    const inputElement = document.getElementById('item');
    const newItem = inputElement.value.trim();

    if (newItem === "") {
        alert("Please enter an item.");
        return;
    }

    try {
        const response = await fetch('/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item: newItem }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();

        const itemList = document.getElementById("itemList");
        const listItem = document.createElement("li");
        listItem.textContent = data.item;
        itemList.appendChild(listItem);

        // Clear the input field
        inputElement.value = "";

        // Add CSS class if the list is not empty
        if (itemList.children.length > 0) {
            itemList.classList.add("listExists");
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission or other default actions
        addItem("item", "itemList"); // Call the addItem function
    }
}

// Attach the event listener to the input field when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("item");
    inputField.addEventListener("keypress", handleKeyPress);
});
