import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./hero-section.css";

import heroImg from "../../assets/images/shiba.png";

const HeroSection = () => {
  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2>
                Welcome to
                <span>NFTBay</span>
              </h2>
              <p>
                NFTbay, a student project of Cal Poly Pomona
                that allow you to invest in the future. This is where dream
                come true as we protect your art with the state of the art
                technology that ensure you the authentic of your work.
              </p>

              <div className="hero__btns d-flex align-items-center gap-4">
                <button className=" explore__btn d-flex align-items-center gap-2">
                  <i class="ri-rocket-line"></i>{" "}
                  <Link to="/market">Explore</Link>
                </button>
                <button className=" create__btn d-flex align-items-center gap-2">
                  <i class="ri-ball-pen-line"></i>
                  <Link to="/create">Create</Link>
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="hero__img">
              <img src={heroImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
