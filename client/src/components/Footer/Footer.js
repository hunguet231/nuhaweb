import React from "react";
import { Grid, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <Grid container spacing={3}>
        <Grid item xs={6} sm={4}>
          <h5>HỖ TRỢ KHÁCH HÀNG</h5>
          <br />
          <Typography variant="subtitle2">Trung tâm trợ giúp</Typography>
          <Typography variant="subtitle2">Quy định</Typography>
          <Typography variant="subtitle2">Quyền riêng tư</Typography>
          <Typography variant="subtitle2">Liên hệ hỗ trợ</Typography>
        </Grid>
        <Grid item xs={6} sm={4}>
          <h5>VỀ BABU</h5>
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
          <Typography
            variant="caption"
            style={{ color: "gray", lineHeight: "1" }}
          >
            GD Plus Team | UEB Business Challenges
            <br />
            &copy;Copyright 2020 - BABU. Phiên bản thử nghiệm
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Footer;
