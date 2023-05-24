import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

 import "./carosel.css";
 import img1  from './images/img1.jpg';
 import img4 from './images/img4.jpg';
 import img5 from './images/img5.jpg';

const imageData = [
  {
    label: "Image 1",
    alt: "image1",
    url:img1,
    
},
    
  {
    label: "Image 2",
    alt: "image2",
    url:img4,
     
  },
  {
    label: "Image 3",
    alt: "image3",
    url: img5},
 
];

const renderSlides = imageData.map((image) => (
  <div key={image.alt}>
    <img src={image.url} alt={image.alt} />
    <p className="legend">{image.label}</p>
  </div>
));

export default function Carosel() {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }
  return (
    <div className="App">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        selectedItem={imageData[currentIndex]}
        onChange={handleChange}
        className="carousel-container"
      >
        {renderSlides}
      </Carousel>
    </div>
  );
}
