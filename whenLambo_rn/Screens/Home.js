import React from 'react';
import { View, Text } from 'react-native';
import { MainLayout } from './index';
import { connect } from 'react-redux';
import { getHoldings, getCoinMarket } from '../Stores/Market/marketActions';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SIZES, FONTS } from '../Constants/index';
import { BalanceInfo, iconTextButton, Charts } from '../Components/index';

const dummyData = [
  {
    id: 'bitcoin',
    qty: 888,
  },
  {
    id: 'ethereum',
    qty: 188,
  },
  {
    id: 'dogecoin',
    qty: 88888,
  },
];

const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  useFocusEffect(
    React.useCallback(() => {
      getHoldings((holdings = dummyData));
      getCoinMarket();
    }, [])
  );

  let totalWallet = myHoldings.reduce(
    (acc, holdings) => acc + (holdings.total || 0),
    0
  );

  let valueChange = myHoldings.reduce(
    (acc, holdings) => acc + (holdings.holding_value_change_7d || 0),
    0
  );

  let perChange = (valueChange / (totalWallet - valueChange)) * 100;

console.log('Coins [0]', coins[0]?.sparkline_in_7d?.price)
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        {/* {Balance Info} */}
        <BalanceInfo
          title="Your Wallet"
          displayAmount={totalWallet}
          changePer={perChange}
          containerStyle={{
            marginTop: 50,
          }}
        />
        {/* {Buttons} */}
      </View>
    );
  }

  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}
      >
        {/* {Header} */}
        {renderWalletInfoSection()}
        {/* {Chart} */}
        <Charts
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        ></Charts>

        {/* {Top Crytos} */}
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
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
      page
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
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
