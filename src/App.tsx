import { Component } from 'react';

import { Props, State } from './types/types';

import Header from './components/Header/Header';
import Main from './pages/Main/Main';
import Footer from './components/Footer/Footer';

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  triggerError = () => {
    const { hasError } = this.state;
    this.setState({ hasError: !hasError });
  };

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header hasError={hasError} triggerError={this.triggerError} />
        <Main hasError={hasError} />
        <Footer />
      </div>
    );
  }
}

export default App;
