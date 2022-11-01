import { Carousel, Image } from "antd";
import photoBeach1 from "../images/beach-chair.jpg";
import photoBeach2 from "../images/beach-sand.jpeg";
import therapy from "../images/therapy.jpeg";
function HomePage() {
  const contentStyle = {
    height: "600px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const imgSize = {
    width: "100%",
  };

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={photoBeach1} className="d-block " alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Gain a new life.</h5>
            {/* <p>Some representative placeholder content for the first slide.</p> */}
          </div>
        </div>
        <div className="carousel-item">
          <img src={photoBeach2} className="d-block " alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Happiness begins here.</h5>
            {/* <p>Some representative placeholder content for the second slide.</p> */}
          </div>
        </div>
        <div className="carousel-item">
          <img src={therapy} className="d-block " alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Caring with a heart.</h5>
            {/* <p>Some representative placeholder content for the third slide.</p> */}
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default HomePage;
