import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-inner">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4} md={3}>
            <h5>HỖ TRỢ KHÁCH HÀNG</h5>
            <br />
            <Link to="/help" className="footer-link">
              Trung tâm trợ giúp
            </Link>
            <Link to="/help/terms" className="footer-link">
              Quy định
            </Link>
            <Link to="/help/terms/privacy" className="footer-link">
              Quyền riêng tư
            </Link>
            <Link to="/help/contacts" className="footer-link">
              Liên hệ hỗ trợ
            </Link>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <h5>VỀ NUHA</h5>
            <br />
            <Link to="/help/about" className="footer-link">
              Giới thiệu
            </Link>
            <Link to="/blog" className="footer-link">
              Blog
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <h5>THÔNG TIN LIÊN HỆ</h5>
            <br />
            <div className="contact">
              <div className="phone">
                <PhoneOutlinedIcon />
                <p>0973.023.427</p>
              </div>
              <div className="mail">
                <EmailOutlinedIcon />
                <p>nuha.bcs5@gmail.com</p>
              </div>
            </div>

            <div className="socal-icon">
              <a
                title="NUHA Page"
                href="https://www.facebook.com/nguonhang.khoxuong"
                target="_blank"
                rel="noreferrer"
              >
                <img width="25" src="/facebook.png" alt="facebook" />
              </a>
              <img width="25" src="/instagram.png" alt="instagram" />
              <img width="25" src="/twitter.png" alt="twitter" />
            </div>
          </Grid>
          <Grid item xs={6} sm={4} md={3}>
            <h5>TẢI ỨNG DỤNG</h5>
            <br />
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <img
                  className="qrcode"
                  width="60"
                  src="/qrcode.svg"
                  alt="qrcode"
                />
              </Grid>
              <Grid item xs={6} className="get-app">
                <img src="/ios.svg" alt="ios" />
                <img src="/android.svg" alt="android" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid align="center" style={{ marginTop: "10px" }} item xs={12}>
            <Typography variant="caption" className="text-bottom">
              GD Plus Team | UEB Business Challenges
              <br />
              &copy;Copyright 2020 - NUHA. Phiên bản thử nghiệm
              <br />
              Made by{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://fb.com/hungnguyen2301"
              >
                Hung
              </a>{" "}
              with ❤
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
