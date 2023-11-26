import { FC } from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import { IResourceResponse } from "../types/types";
import { resolveRouterElement } from "../utils";
import { swApi } from "../services/swApi";
import { wrapper } from "../redux/store";
import MainLayout from "./layout";

interface Params extends ParsedUrlQuery {
  search: string;
  page: string;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { search, page } = context.query as Params;

    const { data } = await store.dispatch(
      swApi.endpoints.getAllCharacter.initiate({
        search: resolveRouterElement(search, ""),
        requestedPage: Number(resolveRouterElement(page, "1")),
      }),
    );
    await Promise.all(store.dispatch(swApi.util.getRunningQueriesThunk()));

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: data || null,
      },
    };
  });

type MainProps = {
  data: IResourceResponse;
};
const Main: FC<MainProps> = ({ data }) => <MainLayout data={data} />;

export default Main;
