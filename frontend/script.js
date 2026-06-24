async function loadProducts() {

    const category =
        document.getElementById("category").value;

    let url = "http://localhost:3000";

    if(category){
        url += `/?category=${category}`;
    }

    const response = await fetch(url);

    const products = await response.json();

    const container =
        document.getElementById("products");

    container.innerHTML = "";

    products.forEach(product => {

        container.innerHTML += `
            <div class="card">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Price: ${product.price}</p>
                <p>Created At: ${product.created_at}</p>
                <p>Updated At: ${product.updated_at}</p>
            </div> 
        `;
    });
}