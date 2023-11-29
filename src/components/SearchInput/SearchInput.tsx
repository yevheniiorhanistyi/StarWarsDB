import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { setSearch, setCurrentPage } from '../../redux/charactersSlice';

import styles from './SearchInput.module.scss';

interface ISearchInputProps {
  search: string;
}

const SearchInput: React.FC<ISearchInputProps> = ({ search }) => {
  const [inputValue, setInputValue] = useState(search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate('/people?page=1');
    dispatch(setSearch(inputValue));
    dispatch(setCurrentPage(1));
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
