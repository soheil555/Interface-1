import socialIcon1 from "../../../public/assets/images/social-ic1.svg";
import socialIcon2 from "../../../public/assets/images/social-ic2.svg";
import socialIcon3 from "../../../public/assets/images/social-ic3.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="social-bx">
          <a href="#" target="_blank">
            <img src={socialIcon1.src} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={socialIcon2.src} alt="" />
          </a>
          <a href="#" target="_blank">
            <img src={socialIcon3.src} alt="" />
          </a>
        </div>
        <div className="quicklink">
          <ul>
            <li>
              <a href="#">Ecosystem</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Governance</a>
            </li>
            <li>
              <a href="#">Developers</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Protocol</a>
            </li>
            <li>
              <a href="#">Disclaimer</a>
            </li>
            <li>
              <a href="#">Trademark</a>
            </li>
            <li>
              <a href="#">Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
