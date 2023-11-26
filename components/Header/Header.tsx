import Image from "next/image";
import Link from "next/link";
import Nav from "../Nav/Nav";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const logo = "/logos/star_wars.png";
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.outerBox}>
          <Link href="/">
            <Image
              width={180}
              height={78}
              className={styles.header__logo}
              src={logo}
              alt="Star Wars"
            />
          </Link>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
