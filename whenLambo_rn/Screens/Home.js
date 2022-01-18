import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {MainLayout} from './index';
import {connect} from 'react-redux';
import {getHoldings, getCoinMarket, fetchMyHoldings} from '../Stores/Market/marketActions';
import {useFocusEffect} from '@react-navigation/native';
import {COLORS, SIZES, FONTS} from '../Constants/index';
import {BalanceInfo, iconTextButton, Charts} from '../Components/index';

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


const Home = ({getHoldings, getCoinMarket, myHoldings, coins, myData, fetchMyHoldings}) => {
  useFocusEffect(
    React.useCallback(() => {
      fetchMyHoldings();
      getCoinMarket();
      getHoldings((holdings = myData));
    }, []),
    );

    console.log('data; ',myData)

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
          title="Your Wallet"
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
        {/* {Header} */}
        {renderWalletInfoSection()}
        {/* {Chart} */}
        <Charts
          containerStyle={{
            marginTop: SIZES.padding * 2,
          }}
          chartPrices={coins[0]?.sparkline_in_7d?.price}
        />
        {/* {Top Crytos} */}
        <FlatList
          data={coins}
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
                Top Cryptocurrency
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
                    {item.name}
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
                    {new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(item.current_price)}
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
