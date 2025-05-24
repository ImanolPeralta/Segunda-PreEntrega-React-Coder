import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const base = import.meta.env.BASE_URL;

const images = [
  `${base}the-dev-store1.png`,
  `${base}the-dev-store2.png`,
  `${base}the-dev-store3.png`,
];

export default function ProductSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false
  };

  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
