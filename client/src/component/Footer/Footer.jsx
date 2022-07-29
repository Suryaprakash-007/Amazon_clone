import React from "react";
import "./Footer.css";

const Footer = ({ pos }) => {
  return (
    <div>
      <footer
        style={{ paddingBottom: "2em", backgroundColor: "#1e2e3a" }}
        fixed={pos}
      >
        <div className="bot container-fluid">
          <a href="#top" style={{ textDecoration: "none" }}>
            <h6 className="less white">Back to top</h6>
          </a>
        </div>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-sm-3">
                <h4
                  className="white"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginTop: "30px",
                  }}
                >
                  Get to Know Us
                </h4>
                <div className="gap">
                  <a className="grey foot" href="#">
                    About Us
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Careers
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Press Release
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Science
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Gift a Smile
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Cares
                  </a>
                </div>
              </div>
              <div className="col-sm-3">
                <h4
                  className="white"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginTop: "30px",
                  }}
                >
                  Connect with Us
                </h4>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Facebook
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Twitter
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Instagram
                  </a>
                </div>
              </div>
              <div className="col-sm-3">
                <h4
                  className="white"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginTop: "30px",
                  }}
                >
                  Make Money with Us
                </h4>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Sell on Amazon
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Sell under Amazon Accelerator
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Fulfilment by Amazon
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Advertise Your Products
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Pay on Merchants
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Global Selling
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Global Selling
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Become an Affiliate
                  </a>
                </div>
              </div>
              <div className="col-sm-3">
                <h4
                  className="white"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginTop: "30px",
                  }}
                >
                  Let Us Help You
                </h4>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Covid-19 and Amazon
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Your Account
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Returns Centre
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    100% Purchase Protection
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon App Download
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Amazon Assisstant
                  </a>
                </div>
                <div className="gap">
                  <a className="grey foot" href="#">
                    Help
                  </a>
                </div>
              </div>
            </div>

            <hr style={{ color: "white" }} />
            <div className="container-fluid">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="logo"
                className="white"
                style={{ height: "40px", marginBottom: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  color: "white",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div>America</div>
                <div>India</div>
                <div>United Kingdom</div>
                <div>Germany</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
