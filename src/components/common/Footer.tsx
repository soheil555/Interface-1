import socialIcon1 from "../../../public/assets/images/social-ic1.svg";
import nftcalendar from "../../../public/assets/images/nftcalendar.svg";
import socialIcon3 from "../../../public/assets/images/social-ic3.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="social-bx">
          <a href="https://twitter.com/axoswap" target="">
            <img src={socialIcon1.src} alt="" />
          </a>
          <a href="https://nftcalendar.io/event/axoswap-announces-release-of-collection-featuring-3333-axolotl-nfts-with-unique-traits/" target="">
            <img src={nftcalendar.src} alt="" />
          </a>
          <a href="https://discord.gg/PJr44AxWAt" target="">
            <img src={socialIcon3.src} alt="" />
          </a>
        </div>
        <div className="quicklink">
          <ul>
            <li>
              <a href="https://docs.axoswap.io">Document</a>
            </li>
            <li>
              <a href="https://github.com/Axoswap-Polygon">Github</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
