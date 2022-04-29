import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import "../styles/wallet.css";

const wallet__data = [
  {
    title: "Bitcoin",
    desc: "'Open-source, P2P money.' Bitcoin is the classic and most popular currency to use on our site!",
    icon: "ri-bit-coin-line",
  },

  {
    title: "Coinbase",
    desc: "'Trusted and easy-to-use,' Coinbase is one of the most user-friendly wallets that are recommended to those who've just begun their crypto-journey.",
    icon: "ri-coin-line",
  },

  {
    title: "Metamask",
    desc: "'Democratizing taccess to the decentralized web,' Metamask is also another of many recommended wallets that's popular among most users.",
    icon: "ri-money-cny-circle-line",
  },

  {
    title: "Authereum",
    desc: "'Simply, the best Web3 experience at your fingertips.' Authereum is dedicated to those who wish to dive into Ethereum.",
    icon: "ri-bit-coin-line",
  },
];

const Wallet = () => {
  return (
    <>
      <CommonSection title="Connect Wallet" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <div className="w-50 m-auto">
                <h3 className="text-light">Connect your wallet</h3>
                <p>
                  Thank you for choosing NFTbay! You may begin by linking one (or many)
                  of your wallets to our database. Simply choose a wallet you're associated with
                  and you may begin bidding or listing whatever your heart desires!
                </p>
              </div>
            </Col>

            {wallet__data.map((item, index) => (
              <Col lg="3" md="4" sm="6" key={index} className="mb-4">
                <div className="wallet__item">
                  <span>
                    <i class={item.icon}></i>
                  </span>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Wallet;
