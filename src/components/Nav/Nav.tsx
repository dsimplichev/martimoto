"use client";

import styles from "./Nav.module.css";
import Image from "next/image";

export const Nav = () => {
  // const { isLoggedIn, user, logout, setUser } = useContext(AuthContext);
  // const { cart } = useContext(CartContext);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  // const [showCartDropdown, setShowCartDropdown] = useState(false);
  // const profileDropdownRef = useRef(null);
  // const cartDropdownRef = useRef(null);
  // const { favorites } = useContext(FavoritesContext);
  // const totalFavorites = favorites ? favorites.length : 0;
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();
  // const isCartPage = location.pathname === '/cart';

  return (
    <div className={styles.navbar}>
      <Image
        className={styles.logo}
        src="/logo.png"
        alt="Marti moto logo"
        fill
      />
      <div className={styles["navbar-content"]}>
        {/* onClick={() => setIsMobileMenuOpen(prev => !prev)} */}
        <div className={styles.hamburger}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* ${isMobileMenuOpen ? "show" : ""} */}
        <ul className={styles[`nav-links`]}>
          <li>
            <a href="#">НАЧАЛО</a>
          </li>
          <li>
            <a href="#">ИЗБЕРИ МОДЕЛ</a>
          </li>
          <li>
            <a href="#">АКСЕСОАРИ</a>
          </li>
          <li>
            <a href="#">КОНТАКТИ</a>
          </li>
          <li>
            <a href="#">ЗА НАС</a>
          </li>
        </ul>
      </div>

      <div className={styles["info-bar"]}>
        <p className={styles["info-text"]}>
          МартиМото ви пожелава весело и незабравимо изкарване на Коледните и
          Новогодишни празници!
        </p>
      </div>
    </div>
  );
};

export default Nav;
