import { Carousel, Image } from "antd";
import photoBeach1 from "../images/beach-chair.jpg";
import photoBeach2 from "../images/beach-sand.jpeg";
import kintsugi from "../images/kintsugi.jpg";
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
              <h1>
                <strong>Happiness begins here.</strong>
              </h1>
              <p>
                Therapy space and regular therapy groups insite and online. Find
                out more details and upcoming events.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={therapy} className="d-block " alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>
                <strong>Caring with heart.</strong>
              </h1>
              <p></p>
            </div>
          </div>
          <div className="carousel-item">
            <img src={kintsugi} className="d-block " alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <h1>
                <strong>Gain a new life.</strong>
              </h1>
              <p>
                A break is something to remember, something of value, a way to
                make the piece more beautiful, rather than something to
                disguise.
              </p>
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
      {/* Footer */}
      <div className="mt-4">
        <br />
      </div>

      <div className="footer text-center">
        <footer className="page-footer font-small teal pt-4">
          <div className="container-fluid text-center text-md-left">
            <div className="row">
              <hr className="clearfix w-100 d-md-none pb-3" />

              <div className="col-md-4 mb-md-0 mb-3 footer-text f-two">
                <p className="text-uppercase font-weight-bold f-title">
                  Julian Bethge
                </p>
                <p>Web Development</p>
                <p>julbethge@gmail.com</p>
              </div>

              <div className="col-md-4 mt-md-0 mt-3 footer-text f-one">
                <p className="text-uppercase font-weight-bold f-title">
                  MyPatients
                </p>
                <p>mypatients.com</p>
                <p>Offices: Berlin | Coruña </p>
              </div>

              <hr className="clearfix w-100 d-md-none pb-3" />

              <div className="col-md-4 mt-md-0 mt-3 footer-text f-three">
                <p className="text-uppercase font-weight-bold f-title">
                  Gabriel Gomez
                </p>
                <p>Web Development</p>
                <p>ggomez.estevez@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="footer-copyright text-center py-3">
            © 2022 Copyright:
            <a href="/"> mypatients.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
