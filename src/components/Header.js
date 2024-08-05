// components/Header.js
import Link from "next/link";
import "../styles/styles.css";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link href="/" legacyBehavior>
          <a className="header-title">Jokes API</a>
        </Link>
        <nav>
          <Link href="/" legacyBehavior>
            <a>Home</a>
          </Link>
          <Link href="/submit" legacyBehavior>
            <a>Submit Joke</a>
          </Link>
          <Link href="/moderate" legacyBehavior>
            <a>Moderate Jokes</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
