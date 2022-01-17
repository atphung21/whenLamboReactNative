import React from 'react';
import {View, Text} from 'react-native';
import {MainLayout} from './index';
import {FONTS, COLORS, SIZES} from '../Constants/index';
import { BalanceInfo, Charts } from '../Components/index'
import { connect } from 'react-redux';

const Portfolio = ({ myHoldings, myData}) => {
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

  function renderPortfolioInfoSection() {
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
        }}>
       {renderPortfolioInfoSection()}
      <Charts
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={myHoldings[0]?.sparkline_in_7d?.value}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
