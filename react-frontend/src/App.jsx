import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [cursor, setCursor] = useState(null);

  const API_URL =
    "https://product-catalog-project2-production-f933.up.railway.app";

  async function loadProducts() {
    let url = API_URL;

    const params = [];

    if (category) {
      params.push(`category=${category}`);
    }

    if (cursor) {
      params.push(`cursor=${cursor}`);
    }

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    const response = await fetch(url);
    const data = await response.json();

    setProducts((prev) => [...prev, ...data]);

    if (data.length > 0) {
      setCursor(data[data.length - 1].id);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Product Catalog</h1>

      <div className="controls">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setProducts([]);
            setCursor(null);
          }}
        >
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Gaming">Gaming</option>
          <option value="Sports">Sports</option>
          <option value="Home">Home</option>
          <option value="Beauty">Beauty</option>
          <option value="Toys">Toys</option>
          <option value="Automotive">Automotive</option>
          <option value="Health">Health</option>
          <option value="Grocery">Grocery</option>
          <option value="Furniture">Furniture</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Music">Music</option>
          <option value="Pet Supplies">Pet Supplies</option>
        </select>

        <button
          onClick={() => {
            setProducts([]);
            setCursor(null);

            setTimeout(() => {
              loadProducts();
            }, 100);
          }}
        >
          Load Products
        </button>
      </div>

      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Price:</strong> ₹{product.price}</p>
            <p><strong>Created:</strong> {product.created_at}</p>
            <p><strong>Updated:</strong> {product.updated_at}</p>
          </div>
        ))}
      </div>

      <button className="next-btn" onClick={loadProducts}>
        Next Page
      </button>
    </div>
  );
}

export default App;