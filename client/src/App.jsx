import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
  getProductsDetail();
  }, []);

  const getProductsDetail = async () => {
    const response = await axios.get(
      "http://localhost:4001/products"
    );
    setProducts(response.data.data);
  };

  const deleteProduct = async (productId) => {
    const result = await axios.delete(
      "http://localhost:4001/products/"+ productId
    );
    
    setProducts((prevProducts) =>
    prevProducts.filter((product) => product.id !== productId)
  );
  }; 

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-preview">
              <img
                src={product.image}
                alt={product.name}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {product.name}</h1>
              <h2>Product price: {product.price} Baht</h2>
              <p>Product description: {product.description}</p>
            </div>
            <button className="delete-button"
              onClick={() => {
                deleteProduct(product.id);
              }}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
