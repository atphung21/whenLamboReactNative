import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {MainLayout} from './index';
import {FONTS, COLORS, SIZES} from '../Constants/index';
import {BalanceInfo, Charts} from '../Components/index';
import {connect} from 'react-redux';

const Portfolio = ({myHoldings, myData}) => {

  console.log('port', myHoldings[0].symbol)
  let totalWallet = myHoldings.reduce(
    (acc, holdings) => acc + (holdings.total || 0),
    0,
  );

  let totalWalletFormatted = new Intl.NumberFormat('us-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalWallet);

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
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding,
          }}
          ListHeaderComponent={
            <View
              style={{
                marginBottom: SIZES.radius,
              }}>
              <Text
                style={{
                  color: 'white',
                  ...FONTS.h3,
                  fontSize: 20,
                }}>
                Your Assets
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: 30,
                  marginBottom: 20,
                  position: 'absolute',
                  alignSelf: 'flex-start'
                }}
              >
                Assets
              </Text>
              <Text
                style={{
                  marginTop: 30,
                  color: 'white',
                  position: 'absolute',
                  alignSelf: 'flex-end',
                }}
              >
                Price
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  height: 55,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* Logo */}
                <View
                  style={{
                    width: 35,
                  }}>
                  <Image
                    source={{
                      uri: item.image,
                      height: 20,
                      width: 20,
                    }}
                  />
                </View>
                {/* Name */}
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {item.symbol}
                  </Text>
                </View>
                {/* Mini Chart */}

                {/* Price */}
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    {new Intl.NumberFormat('us-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(item.current_price)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
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
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
