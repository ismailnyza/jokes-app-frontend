// components/Layout.js
import Header from "./Header";
import "../styles/styles.css";

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
