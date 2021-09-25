import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

const Dashboard = () => {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 500, onEnter: { duration: 0 } }}
      >
        <VictoryLine
          data={data}
          // data accessor for x values
          x="quarter"
          // data accessor for y values
          y="earnings"
        />
      </VictoryChart>

    </div>
  );
};

export default Dashboard;
