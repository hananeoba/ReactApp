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

const screenWidth = Dimensions.get("window").width;
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0.4,
  backgroundGradientTo: "dimgray",
  backgroundGradientToOpacity: 0.9,
  color: (opacity = 2) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.7,
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
      style={{ flexDirection: "row" }}
      directionalLockEnabled={true}
      horizontal={true}
    >
      <BarChart
        yAxisInterval={1}
        data={data}
        width={screenWidth}
        height={200}
        chartConfig={chartConfig}
        showBarTops={false}
      />
    </ScrollView>
  );
};
