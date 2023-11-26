import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ICharListProps } from "../../types/types";
import { getCharacterImage, getNumberFromString } from "../../utils";

import styles from "./CharList.module.scss";

const CharList: React.FC<ICharListProps> = ({ items, limit }) => {
  const router = useRouter();
  const { page } = router.query;
  const noResultsImage = "/fighter.png";

  if (items.length === 0) {
    return (
      <div className={styles.char__empty}>
        <h3>No results found in this galaxy...</h3>
        <Image
          width={350}
          height={380}
          src={noResultsImage}
          alt="Sormtroopers"
        />
      </div>
    );
  }

  return (
    <ul className={styles.char__list}>
      {items.slice(0, limit).map((char) => (
        <li key={char.name} className={styles.char__item}>
          <Link
            href={`/details/${getNumberFromString(char.url)}?page=${page}`}
            data-testid={char.name}
          >
            <Image
              width={350}
              height={250}
              className={styles.char__img}
              src={getCharacterImage(char)}
              alt={char.name}
            />
            <div className={styles.char__description}>
              <h4 className={styles.char__title}>{char.name}</h4>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CharList;
