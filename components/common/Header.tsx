import { useState } from "react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import ThemeTogglerSM from "./ThemeTogglerSM";

import logo from "../../public/assets/images/logo@2x.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-md navbar-light">
          <Link href="/">
            <a className="navbar-brand">
              <img className="dark-mode-logo" src={logo.src} alt="Logo" />
            </a>
          </Link>

          <ThemeTogglerSM />

          <button
            className={`navbar-toggler ${isMenuOpen ? "collapsed" : ""}`}
            type="button"
            aria-expanded={`${isMenuOpen ? true : false}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <Link href="/protocol" passHref>
            <button className="btn-main publish-btn">Launch App</button>
          </Link> */}
          <div
            className={`collapse navbar-collapse  ${isMenuOpen ? "show" : ""}`}
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="#" data-scroll-nav={0}>
                  Ecosystem
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Community
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Governance
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Developers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Blog
                </a>
              </li>
            </ul>
            <ul className="navbar-nav right-navbar-nav">
              <li className="nav-item">
                <Link href="/swap">
                  <a className="nav-link publish-btn">
                    <span>Launch App</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <ThemeToggler />
              </li>
            </ul>
          </div>
        </nav>
        <a className="hideclick d-none" data-scroll-goto />
      </div>
    </header>
  );
};

export default Header;
