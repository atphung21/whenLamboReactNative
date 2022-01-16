import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {MainLayout} from './index';
import {connect} from 'react-redux';
import {FONTS, COLORS, SIZES} from '../Constants/index';
import {getHoldings, getCoinMarket} from '../Stores/Market/marketActions';

const Market = ({getHoldings, getCoinMarket, coins}) => {
getCoinMarket();
console.log('Marketpage: ', coins)
  return (
    <MainLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.black,
        }}>
        <Text
          style={{
            marginTop: 60,
            marginLeft: 10,
            ...FONTS.h2,
            color: COLORS.lightGray3,
          }}>
          Market
        </Text>
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
                Market - Filler For Now
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
                    ${item.current_price}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);
