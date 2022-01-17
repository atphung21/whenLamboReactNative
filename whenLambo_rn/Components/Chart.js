import React from 'react';
import {View, Text} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import {SIZES, COLORS, FONTS} from '../Constants/index';
import moment from 'moment';

const Charts = ({containerStyle, chartPrices}) => {
  // Points on charts
  let startUnixTime = moment().subtract(7, 'day').unix();
  const data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTime + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  const points = monotoneCubicInterpolation({data, range: 40});

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    return `$${Number(value).toFixed(2)}`
  };

  const formatChartXLabels = value => {
    if (value === '') {
      return '';
    }
    return (new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(value));
    //`$${value.toFixed(2)}`;
  };

  const getYAxisValue = () => {
    'worklet';
    if (chartPrices != undefined) {
      let minValue = Math.min(...chartPrices);
      let maxValue = Math.max(...chartPrices);
      let midValue = (minValue + maxValue) / 2;
      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (midValue + minValue) / 2;

      return [
        formatChartXLabels(maxValue),
        formatChartXLabels(higherMidValue),
        formatChartXLabels(midValue),
        formatChartXLabels(lowerMidValue),
        formatChartXLabels(minValue),
      ];
    } return [];
  };
  return (
    <View style={{...containerStyle}}>
      <View
        style={{
          position: 'absolute',
          left: 15,
          top: 0,
          bottom: 0,
          justifyContent: 'space-between',
        }}>
        {getYAxisValue().map((item, index) => {
          return (
            <Text
              key={index}
              style={{
                color: COLORS.lightGray3,
                ...FONTS.body4,
              }}>
              {item}
            </Text>
          );
        })}
      </View>
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points: points,
            smoothingStrategy: 'bezier',
          }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />
          <ChartDot>
            <View
              style={{
                position: 'absolute',
                left: -35,
                width: 80,
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}>
              {/* DOT */}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}>
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                />
              </View>
              {/* Y label */}
              <ChartYLabel
                format={formatUSD}
                style={{
                  color: COLORS.white,
                  ...FONTS.body5,
                }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Charts;
