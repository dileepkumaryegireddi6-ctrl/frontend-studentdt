import React, { useEffect, useMemo, useState } from "react";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://backend-studentdt-8.onrender.com/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else setProducts([]);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setProducts([]);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (!q) return true;
      const title = (p.title || p.phone_name || "").toString().toLowerCase();
      const brand = (p.brand || "").toString().toLowerCase();
      return title.includes(q) || brand.includes(q);
    });

    if (sort === "price-asc") {
      list = list.slice().sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (sort === "price-desc") {
      list = list.slice().sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    }

    return list;
  }, [products, query, sort]);

  const addToCart = (id) => {
    setCart((c) => (c.includes(id) ? c : [...c, id]));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Products</h1>
        </div>

        <div className="controls">
          <button className="btn secondary" onClick={() => setShow((s) => !s)}>
            {show ? "Hide" : "Show"}
          </button>

          <input
            type="search"
            placeholder="Search by name or brand"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>

          <button className="btn secondary" onClick={clearCart} title="Clear cart">
            Cart <span className="cart-badge">{cart.length}</span>
          </button>
        </div>
      </div>

      {show && (
        <div>
          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((product) => {
                const id = product._id || product.id || product.phone_name || product.title;
                const img = product.image || product.thumbnail || product.img;
                return (
                  <div className="product-card" key={id}>
                    <h3>{product.title || product.phone_name}</h3>
                    {img && <img src={img} alt={product.title || product.phone_name} />}

                    <div className="product-meta">
                      <p>
                        <strong>Brand:</strong> {product.brand || "—"}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{product.price ?? "—"}
                      </p>
                      {product.ram && (
                        <p>
                          <strong>RAM:</strong> {product.ram}
                        </p>
                      )}
                      {product.storage && (
                        <p>
                          <strong>Storage:</strong> {product.storage}
                        </p>
                      )}
                    </div>

                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => addToCart(id)} disabled={cart.includes(id)}>
                        {cart.includes(id) ? "Added" : "Add to cart"}
                      </button>
                      <button className="btn secondary" onClick={() => setSelected(product)}>
                        Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">No products found.</div>
          )}
        </div>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0 }}>{selected.title || selected.phone_name}</h3>
              <button className="btn secondary" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>

            <div className="modal-body">
              {(selected.image || selected.thumbnail) && (
                <img src={selected.image || selected.thumbnail} alt={selected.title} />
              )}
              <div>
                <p>
                  <strong>Brand:</strong> {selected.brand || "—"}
                </p>
                <p>
                  <strong>Price:</strong> ₹{selected.price ?? "—"}
                </p>
                {selected.ram && (
                  <p>
                    <strong>RAM:</strong> {selected.ram}
                  </p>
                )}
                {selected.storage && (
                  <p>
                    <strong>Storage:</strong> {selected.storage}
                  </p>
                )}
                {selected.description && <p>{selected.description}</p>}
                <div style={{ marginTop: 10 }}>
                  <button className="btn" onClick={() => addToCart(selected._id || selected.id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;