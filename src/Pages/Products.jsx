import React, { useEffect, useState } from 'react'

const Products = () => {

  const [products, setproducts] = useState([])
  const [show, setshow] = useState(false)

  useEffect(() => {
  fetch("https://backend-studentdt-2-6ai3.onrender.com")
    .then(res => res.json())
    .then(data => {
      setproducts(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.log(err);
      setproducts([]);
    });
}, []);
  return (
    <div>

      <h1>Products Page</h1>

      <button onClick={() => setshow(!show)}>
        {show ? "Hide Products" : "Show Products"}
      </button>

      {show && Array.isArray(products) && (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
    {products.map((product) => (
      <div key={product.id}>
        <h4>{product.title}</h4>
        <img src={product.image} width="100px" />
        <h3>₹ {product.price}</h3>
      </div>
    ))}
  </div>
)}

    </div>
  )
}

export default Products