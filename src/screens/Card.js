import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Card(props) {
  let data = useCart();
  const dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let foodItem = props.item;

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });

        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          className="card mt-3"
          style={{ width: "16rem", maxHeight: "360px" }}
        >
          <img
            src={props.ImgSrc}
            className="card-img-top"
            alt="..."
            style={{ height: "140px", objectFit: "cover" }}
          />
          <div className="card-body card-hover">
            <h5 className="card-title">{props.foodName}</h5>
            <div className="container w-100 p-0" style={{ height: "38px" }}>
              <select
                className="m-2 h-100 w-20 bg-success rounded"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100 w-20 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline ms-2 h-100 w-20 fs-5">
                ₹{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            <button
              className={`btn btn-success justify-center ms-2 `}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
