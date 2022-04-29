import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./step-section.css";

const STEP__DATA = [
  {
    title: "Setup your wallet",
    desc: "Once you’ve set up your wallet of choice, connect it to NFTBay by clicking 'Connect Wallet.' We promise we'll only collected the data we need.",
    icon: "ri-wallet-line",
  },

  {
    title: "Create your collection",
    desc: "Click here and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
    icon: "ri-layout-masonry-line",
  },

  {
    title: "Add your NFTs",
    desc: "Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
    icon: "ri-image-line",
  },

  {
    title: "List them for sale",
    desc: "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we'll help you sell them!",
    icon: "ri-list-check",
  },
];

const StepSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-4">
            <h3 className="step__title">Create and sell your NFTs</h3>
          </Col>

          {STEP__DATA.map((item, index) => (
            <Col lg="3" md="4" sm="6" key={index} className="mb-4">
              <div className="single__step__item">
                <span>
                  <i class={item.icon}></i>
                </span>
                <div className="step__item__content">
                  <h5>
                    <Link to="/wallet">{item.title}</Link>
                  </h5>
                  <p className="mb-0">{item.desc}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default StepSection;
