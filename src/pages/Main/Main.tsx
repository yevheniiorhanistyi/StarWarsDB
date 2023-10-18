import { Component } from 'react';

import { IMainState } from '../../types/types';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import ApiService from '../../services/apiService';
import Search from '../../components/Search/Search';
import CharList from '../../components/CharList/CharList';
import Spinner from '../../components/Spinner/Spinner';

import styles from './Main.module.scss';

class Main extends Component<Record<string, never>, IMainState> {
  apiService = new ApiService();

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      loading: true,
      inputValue: getFromLocalStorage('searchValue') || '',
      charList: [],
    };
  }

  async componentDidMount() {
    const { inputValue } = this.state;
    this.loadData(inputValue);
  }

  loadData = async (inputValue: string) => {
    try {
      this.setState({ loading: true });
      const res = await this.apiService.getAllCharacters(inputValue);
      this.setState({ charList: res.results, loading: false });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  handleSearchInputChange = (newValue: string) => {
    this.setState({ inputValue: newValue });
    saveToLocalStorage('searchValue', newValue);
  };

  handleSubmit = async () => {
    const { inputValue } = this.state;
    this.loadData(inputValue);
  };

  render() {
    const { inputValue, charList, loading } = this.state;
    const mainClass = loading ? `${styles.main} ${styles.main__loading}` : styles.main;

    return (
      <main className={mainClass}>
        <div className={styles.wrapper}>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.container}>
              <Search
                value={inputValue}
                onSearchChange={this.handleSearchInputChange}
                handleSubmit={this.handleSubmit}
              />
              <CharList data={charList} />
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default Main;
