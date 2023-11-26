import { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { IResourceResponse } from "../types/types";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SearchInput from "../components/SearchInput/SearchInput";
import CharList from "../components/CharList/CharList";
import Pagination from "../components/Pagination/Pagination";

import Spinner from "../components/Spinner/Spinner";
import styles from "../scss/MainPage.module.scss";
import { RootState } from "../redux/store";

type MainLayoutProps = {
  children?: ReactNode;
  data: IResourceResponse;
};

const MainLayout: FC<MainLayoutProps> = ({ children, data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { page, id } = router.query;
  const { limit, currentPage } = useSelector(
    (state: RootState) => state.charactersReducer,
  );

  const totalCount = data.count || 0;

  useEffect(() => {
    if (!page) router.push({ pathname: "/", query: { page: 1 } });
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
    };
  }, []);

  const wrapperClass = id ? `${styles.wrapper} ${styles.info}` : styles.wrapper;
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
      <main className={styles.main}>
        <div className={styles.container}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div className={wrapperClass}>
              <div className={styles.leftColumn}>
                <SearchInput />
                <CharList items={data.results} limit={limit} />
                <Pagination
                  currentPage={currentPage}
                  totalCount={totalCount}
                  limit={limit}
                />
                {id && (
                  <div
                    className={styles.backdrop}
                    onClick={() =>
                      router.push({ pathname: "/", query: { page: 1 } })
                    }
                    role="button"
                    tabIndex={0}
                    data-testid="backdrop"
                  />
                )}
              </div>
              {children}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

MainLayout.defaultProps = {
  children: null,
};

export default MainLayout;
