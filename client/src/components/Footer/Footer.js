import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-inner">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <h5>HỖ TRỢ KHÁCH HÀNG</h5>
            <br />
            <Typography variant="subtitle2">Trung tâm trợ giúp</Typography>
            <Typography variant="subtitle2">Quy định</Typography>
            <Typography variant="subtitle2">Quyền riêng tư</Typography>
            <Typography variant="subtitle2">Liên hệ hỗ trợ</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <h5>VỀ NUHA</h5>
            <br />
            <Typography variant="subtitle2">Giới thiệu</Typography>
            <Typography variant="subtitle2">Blog</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <h5>LIÊN KẾT XÃ HỘI</h5>
            <br />
            <img width="32" src="/facebook.svg" />
            <img width="32" src="/instagram.svg" />
            <img width="32" src="/twitter.svg" />
          </Grid>
        </Grid>
        <Grid container>
          <Grid align="center" item xs={12}>
            <Typography variant="caption" className="text-bottom">
              GD Plus Team | UEB Business Challenges
              <br />
              &copy;Copyright 2020 - NUHA. Phiên bản thử nghiệm
              <br />
              Made by <a href="https://fb.com/hungnguyen2301">Hung</a> with ❤
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
