import React from 'react';
import { View, Text } from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import { SIZES, COLORS, FONTS } from '../Constants/index';
import moment from 'moment';

const Charts = ({ containerStyle, chartPrices }) => {
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
    const points = monotoneCubicInterpolation({ data,range: 40 });
    console.log('data:', data);
    console.log('Points ', points);

  return (
    <View style={{ ...containerStyle }}>
      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points: points,
            smoothingStrategy: 'bezier',
          }}
        >
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
                backgroundColor: 'red',
              }}
            >
              {/* DOT */}
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                >
                </View>
              </View>
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Charts;
