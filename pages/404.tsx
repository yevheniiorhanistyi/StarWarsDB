import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import styles from "../scss/ErrorPage.module.scss";

const ErrorPage: React.FC = () => {
  const imgSrc = "/e404.jpeg";
  return (
    <>
      <Head>
        <title>StarWarsDB</title>
        <meta
          name="description"
          content="StarWarsDB is an application designed for 'Star Wars' enthusiasts. We provide access to a rich database of information, facts, and data about the 'Star Wars' galaxy, characters, planets, ships, and more. Learn more about this amazing universe and share your knowledge with fellow fans."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.root}>
        <Image width={482} height={323} src={imgSrc} alt="Nothing not found" />
        <h2>Great shot kid. That was one in a million.</h2>
        <Link href="/">Let&apos;s get you home</Link>
      </div>
      <Footer />
    </>
  );
};

export default ErrorPage;
