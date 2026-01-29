let prices = JSON.parse(localStorage.getItem("prices")) || [];

const addBtn = document.getElementById("addBtn");
const addForm = document.getElementById("addForm");
const saveBtn = document.getElementById("saveBtn");
const results = document.getElementById("results");
const searchInput = document.getElementById("searchInput");

addBtn.onclick = function () {
    addForm.style.display = addForm.style.display === "none" ? "block" : "none";
};

saveBtn.onclick = function () {
    const product = document.getElementById("product").value;
    const store = document.getElementById("store").value;
    const price = parseFloat(document.getElementById("price").value);
    const validity = parseInt(document.getElementById("validity").value);
    const photoInput = document.getElementById("photo");

    if (!product || !store || !price || !validity) {
        alert("Compila tutti i campi obbligatori");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        const item = {
            product: product,
            store: store,
            price: price,
            validity: validity,
            date: new Date().toISOString(),
            photo: reader.result || null
        };

        prices.push(item);
        localStorage.setItem("prices", JSON.stringify(prices));

        addForm.style.display = "none";
        document.getElementById("product").value = "";
        document.getElementById("store").value = "";
        document.getElementById("price").value = "";
        document.getElementById("validity").value = "";
        document.getElementById("photo").value = "";

        renderResults();
    };

    if (photoInput.files[0]) {
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        reader.onload();
    }
};

searchInput.oninput = renderResults;

function renderResults() {
    const query = searchInput.value.toLowerCase();
    results.innerHTML = "";

    let filtered = prices.filter(p =>
        p.product.toLowerCase().includes(query)
    );

    filtered.sort((a, b) => a.price - b.price);

    filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "result";
        div.innerHTML = `
            <strong>${p.product}</strong><br>
            €${p.price.toFixed(2)} – ${p.store}<br>
            <small>${validityText(p)}</small>
            ${p.photo ? `<br><img src="${p.photo}" class="photo">` : ""}
        `;
        results.appendChild(div);
    });
}

function validityText(p) {
    const inserted = new Date(p.date);
    const today = new Date();
    const diffDays = Math.floor((today - inserted) / (1000 * 60 * 60 * 24));

    if (diffDays <= p.validity) {
        return "Prezzo recente";
    } else {
        return "Prezzo vecchio";
    }
}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}
