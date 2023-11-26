import { useRouter } from "next/router";
import Image from "next/image";

import { ICharData } from "../../types/types";
import { getCharacterImage } from "../../utils";

import styles from "./AdditionalInfo.module.scss";

type AdditionalInfoProps = {
  item: ICharData;
};

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ item }) => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div>
      {item && (
        <div className={styles.wrapper}>
          <div className={styles.item}>
            <Image
              width={370}
              height={450}
              className={styles.item__img}
              src={getCharacterImage(item)}
              alt={item.name}
            />
            <div className={styles.item__description}>
              <h4 className={styles.item__title}>{item.name}</h4>
              <p
                className={styles.item__attribute}
              >{`Height: ${item.height}`}</p>
              <p className={styles.item__attribute}>{`Weight: ${item.mass}`}</p>
              <p
                className={styles.item__attribute}
              >{`Hair Color: ${item.hair_color}`}</p>
              <p
                className={styles.item__attribute}
              >{`Skin Color: ${item.skin_color}`}</p>
              <p
                className={styles.item__attribute}
              >{`Eye Color: ${item.eye_color}`}</p>
              <p
                className={styles.item__attribute}
              >{`Gender: ${item.gender}`}</p>
            </div>
            <button
              onClick={() => router.push({ pathname: "/", query: { page } })}
              className={styles.item__close}
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalInfo;
