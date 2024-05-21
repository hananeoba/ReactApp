import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import { globalColors } from "../styles/global";

const screenWidth = 600//Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: globalColors.white,
  backgroundGradientFromOpacity: 0.4,
  backgroundGradientTo: globalColors.primary,
  backgroundGradientToOpacity: 0.9,
  color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage:0.7,
  useShadowColorFromDataset: false, // optional
};

export default ChartComponent = ({ datata, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: datata,
        color: (opacity = 1) => `rgba(134, 65, 24, ${opacity})`, // optional
        strokeWidth: 1, // optional
      },
    ],
  };

  return (
    <ScrollView
      style={{ flexDirection: "row" ,
      borderRadius: 10,
      }}
      directionalLockEnabled={false}
      horizontal={true}
      
    >
      <BarChart
        yAxisInterval={1}
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        showBarTops={true}
      />
    </ScrollView>
  );
};
