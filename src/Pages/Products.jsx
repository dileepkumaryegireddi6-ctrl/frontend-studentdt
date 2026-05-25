import React, { useEffect, useState } from 'react'

const Products = () => {

  const [products, setproducts] = useState([])
  const [show, setshow] = useState(false)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => setproducts(data))
  }, [])

  return (
    <div>

      <h1>Products Page</h1>

      <button onClick={() => setshow(!show)}>
        {show ? "Hide Products" : "Show Products"}
      </button>

      {show && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {products.map((product) => (
            <div key={product.id} style={{ width: "200px", border: "1px solid #ddd", padding: "10px" }}>

              <h4>{product.title}</h4>

              <img src={product.image} alt={product.title} width="100px" />

              <h3>₹ {product.price}</h3>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Products