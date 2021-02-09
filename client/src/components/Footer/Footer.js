import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
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
          <Grid item xs={6} sm={4} md={3}>
            <h5>LIÊN KẾT XÃ HỘI</h5>
            <br />
            <div className="socal-icon">
              <a
                title="NUHA Page"
                href="https://www.facebook.com/nguonhang.khoxuong"
                target="_blank"
                rel="noreferrer"
              >
                <img width="32" src="/facebook.png" alt="facebook" />
              </a>
              <img width="32" src="/instagram.png" alt="instagram" />
              <img width="32" src="/twitter.png" alt="twitter" />
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
          <Grid align="center" item xs={12}>
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
