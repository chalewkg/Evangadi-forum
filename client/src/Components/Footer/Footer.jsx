import React from "react";
import footer_logo from "../../Asset/Image/10002.png";
import classes from "./footer.module.css";

function Footer() {
  return (
    <section className={classes.footer_container}>
      <div className={classes.right_footer}>
        <div className={classes.footer_logo}>
          <img src={footer_logo} />
        </div>
        <div className={classes.socialmedia}>
          <ul>
            <li>
              <a href='https://www.facebook.com/evangaditech'>faceBook</a>
            </li>

            <li>
              <a href='https://www.instagram.com/evangaditech/'>Instagram</a>
            </li>

            <li>
              <a href='https://www.youtube.com/@EvangadiTech'>YouTube</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={classes.middle_footer}>
        <h5>Useful Link</h5>
        <ul>
          <li>
            <a href='#'> Terms of Service</a>
          </li>
          <li>
            <a href='#'> Privacey policy</a>
          </li>
        </ul>
      </div>

      <div className={classes.left_footer}>
        <h5>Contact Info</h5>
        <ul>
          <li>
            <a href='#'> support@evangadi.com</a>
          </li>
          <li>
            <a href='#'> +1-202-123-4567</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Footer;
