import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';

const chartConfig = {
  backgroundGradientFrom: '#f0f0f0', // Fundo claro
  backgroundGradientTo: '#ffffff',   // Fundo claro
  color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Linha em verde
  labelColor: (opacity = 1) => '#333333', // Texto escuro
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#228B22', // Verde escuro nos pontos
  },
};
const screenWidth = Dimensions.get('window').width;

const linedata = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(34, 139, 34, ${opacity})`, // Linha em verde
      strokeWidth: 2,
    }
  ],
  legend: ["Rainy Days"]
};

const data = [
  {
    name: 'Category A',
    population: 45,
    color: '#7cbf7c',
    legendFontColor: '#333333',
    legendFontSize: 15,
  },
  {
    name: 'Category B',
    population: 30,
    color: '#9fd89f',
    legendFontColor: '#333333',
    legendFontSize: 15,
  },
  {
    name: 'Category C',
    population: 25,
    color: '#bfeabf',
    legendFontColor: '#333333',
    legendFontSize: 15,
  },
];

const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f5f5f5', '#ffffff']} // Fundo bem claro
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Text style={styles.title}>Analytics</Text>
      <View style={styles.scvc}>
        <ScrollView style={styles.scv}>
          {Array.from({ length: 5 }).map((_, index) => (
            <PieChart
              key={index}
              data={data}
              width={screenWidth * 0.8}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          ))}

          <LineChart
            data={linedata}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={chartConfig}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            style={{
              marginVertical: 20,
              borderRadius: 16,
              backgroundColor: 'transparent',
            }}
            decorator={() => {
              return linedata.datasets[0].data.map((value, index) => {
                const x = (screenWidth * 0.9 - 64) / (linedata.labels.length - 1) * index + 32;
                const y = 220 - (value / Math.max(...linedata.datasets[0].data)) * 200;
                return (
                  <Text
                    key={index}
                    style={{
                      position: 'absolute',
                      left: x - 10,
                      top: y - 20,
                      fontSize: 12,
                      color: '#333333',
                      fontWeight: 'bold',
                    }}
                  >
                    {value}
                  </Text>
                );
              });
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // fundo claro
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333333', // texto escuro
    marginBottom: 20,
  },
  scv: {
    alignSelf: 'center',
  },
  scvc: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
