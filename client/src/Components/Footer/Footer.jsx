import React from "react";
import footer_logo from "../../Asset/Image/10002.png";
import classes from "./footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <section className={classes.footer_container}>
      <div className={classes.footer_inner_container}>
        <div className={classes.left_footer}>
          <div className={classes.footer_logo}>
            <img src={footer_logo} />
          </div>
          <div className={classes.socialmedia}>
            <ul>
              <li>
                <a href='https://www.facebook.com/evangaditech'>
                  <FacebookIcon color='primary' fontSize='large' />
                </a>
              </li>

              <li>
                <a href='https://www.instagram.com/evangaditech/'>
                  <InstagramIcon color='primary' fontSize='large' />
                </a>
              </li>

              <li>
                <a href='https://www.youtube.com/@EvangadiTech'>
                  <YouTubeIcon color='primary' fontSize='large' />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.middle_footer}>
          <div>
            <h4>Useful Link</h4>
          </div>
          <div>
            <ul>
              <li>
                <a href='#'> How it Works</a>
              </li>
              <li>
                <a href='#'> Terms of Service</a>
              </li>
              <li>
                <a href='#'> Privacey policy</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={classes.right_footer}>
          <div>
            <h4>Contact Info</h4>
          </div>
          <div>
            <ul>
              <li>
                <a href='#'> Evangadi Network</a>
              </li>
              <li>
                <a href='#'> support@evangadi.com</a>
              </li>
              <li>
                <a href='#'> +1-202-123-4567</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
