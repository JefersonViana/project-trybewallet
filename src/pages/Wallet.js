// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
// import coinAllFetch from '../redux/reducers/coinAllFetch';
import Table from '../components/Table';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(coinAllFetch(dispatch));
  // }

  render() {
    return (
      <div>
        <Header />
        <WalletForm />
        <Table />
      </div>
    );
  }
}

// Wallet.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Wallet);
