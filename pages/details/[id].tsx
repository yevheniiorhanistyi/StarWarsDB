import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ICharData, IResourceResponse } from "../../types/types";
import { wrapper } from "../../redux/store";
import { swApi } from "../../services/swApi";
import MainLayout from "../layout";
import AdditionalInfo from "../../components/AdditionalInfo/AdditionalInfo";
import { resolveRouterElement } from "../../utils";

interface Params extends ParsedUrlQuery {
  search: string;
  page: string;
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { search, page, id } = context.query as Params;
    const item = await store.dispatch(
      swApi.endpoints.getCharacter.initiate({
        details: resolveRouterElement(id, ""),
      }),
    );
    const { data } = await store.dispatch(
      swApi.endpoints.getAllCharacter.initiate({
        search: resolveRouterElement(search, ""),
        requestedPage: Number(resolveRouterElement(page, "1")),
      }),
    );
    Promise.all(store.dispatch(swApi.util.getRunningQueriesThunk()));

    if (!data || !item) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data,
        item: item?.data,
      },
    };
  });

type DetailsPageProps = {
  data: IResourceResponse;
  item: ICharData;
};

const DetailsPage: React.FC<DetailsPageProps> = ({ item, data }) => (
  <MainLayout data={data}>
    <AdditionalInfo item={item} />
  </MainLayout>
);

export default DetailsPage;
