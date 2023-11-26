import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import { setTerm, setCurrentPage } from "../../redux/charactersSlice";
import { resolveRouterElement } from "../../utils";

import styles from "./SearchInput.module.scss";

const SearchInput: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { search } = router.query;
  const [inputValue, setInputValue] = useState(
    resolveRouterElement(search, ""),
  );

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    dispatch(setTerm(inputValue));
    dispatch(setCurrentPage(1));
    const query = inputValue ? { page: 1, search: inputValue } : { page: 1 };
    router.push({
      query,
    });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Type to search"
          value={inputValue}
          onChange={onSearchChange}
        />
        <button type="submit" name="submit" className={styles.search__icon}>
          <span className={styles.search__span} />
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
