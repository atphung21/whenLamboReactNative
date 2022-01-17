import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {MainLayout} from './index';
import {FONTS, COLORS, SIZES} from '../Constants/index';
import { renderWalletInfoSection } from './Home';
import { BalanceInfo } from '../Components/index';
import {connect} from 'react-redux';

const Portfolio = ({ coins, myData, myHoldings }) => {

  let totalWallet = myHoldings.reduce(
    (acc, holdings) => acc + (holdings.total || 0),
    0,
  );

  let totalWalletFormatted = new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(totalWallet);

  let valueChange = myHoldings.reduce(
    (acc, holdings) => acc + (holdings.holding_value_change_7d || 0),
    0,
  );

  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}>
        {/* {Balance Info} */}
        <BalanceInfo
          title="Portfolio"
          displayAmount={totalWalletFormatted}
          changePer={perChange}
          containerStyle={{
            marginTop: 50,
          }}
        />
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        {/* {Balance Info} */}
       {renderWalletInfoSection()}

      </View>
    </MainLayout>
  );
};


function mapStateToProps(state) {
  return {
    myData: state.marketReducer.myData,
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
    fetchMyHoldings: () => {
      return dispatch(fetchMyHoldings());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps, renderWalletInfoSection)(Portfolio);