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
    <>
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
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div class="mt-4"></div>
      {/* Footer */}

      <div class="footer text-center">
        <footer class="page-footer font-small teal pt-4">
          <div class="container-fluid text-center text-md-left">
            <div class="row">
              <hr class="clearfix w-100 d-md-none pb-3" />

              <div class="col-md-4 mb-md-0 mb-3 footer-text f-two">
                <p class="text-uppercase font-weight-bold f-title">
                  Julian Bethge
                </p>
                <p>Web Development</p>
                <p>julbethge@gmail.com</p>
              </div>

              <div class="col-md-4 mt-md-0 mt-3 footer-text f-one">
                <p class="text-uppercase font-weight-bold f-title">
                  MyPatients
                </p>
                <p>mypatients.com</p>
                <p>Offices: Berlin | Coruña </p>
              </div>

              <hr class="clearfix w-100 d-md-none pb-3" />

              <div class="col-md-4 mt-md-0 mt-3 footer-text f-three">
                <p class="text-uppercase font-weight-bold f-title">
                  Gabriel Gomez
                </p>
                <p>Web Development</p>
                <p>ggomez.estevez@gmail.com</p>
              </div>
            </div>
          </div>

          <div class="footer-copyright text-center py-3">
            © 2022 Copyright:
            <a href="/"> mypatients.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
