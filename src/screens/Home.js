import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "./Card";

export default function Home() {
  /*object ({}) mein .map function use nahi kr sakte , .map function array([]) pr hi use kr sakte hai */
  const [search, setSearch] = useState(' ');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadFoodItems = async () => {
    let response = await fetch("https://restaurant-mgmt-backend-proj.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response)
    // console.log(response[1][0].CategoryName)
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"cover !important"}}>

            <div className="carousel-inner"  id='carousel'>
              <div class="carousel-caption"  style={{ zIndex: "10" }}>
                <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                  <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                  {/* <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button> */}
                </div>
              </div>
              <div className="carousel-item active" >
                <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?cs=srgb&dl=pexels-ash-376464.jpg&fm=jpg" className="d-block w-100" style={{ filter: "brightness(75%)"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img  src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?cs=srgb&dl=pexels-ella-olsson-1640772.jpg&fm=jpg" className="d-block w-100" style={{ filter: "brightness(75%)"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886"  className="d-block w-100" style={{ filter: "brightness(75%)"}} alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
            </div>

      </div>

      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filterItems) => {
                        return (
                          <div className="col-12 col-md-6 col-lg-3">
                            <Card
                              foodItem= {filterItems}
                              foodName={filterItems.name}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            />
                          </div>
                        );
                      })
                  ) : (
                    <div>No Such Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
