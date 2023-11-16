import { Flex, Heading } from '@chakra-ui/react';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getProfitData } from '../api/booking';

/**
 * Component: Profits
 * Description: This component displays a line chart showing profit data for the last 30 days.
 */
function Profits () {
  // State to store chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Chart options
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days ago'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Profit ($)'
        },
      }
    },
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },
    responsive: true,
    cubicInterpolationMode: 'monotone'
  };

  // Fetch profit data from the API and update the chart data state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfitData();
        if (data && Array.isArray(data)) {
          setChartData({
            labels: data.map(d => d.day),
            datasets: [
              {
                label: 'Profit',
                data: data.map(d => d.profit),
                fill: false,
                backgroundColor: 'rgb(255, 90, 95)',
                borderColor: 'rgb(255, 90, 95)',
                pointRadius: 0,
                pointHoverRadius: 5,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching profit data:', error);
      }
    };

    fetchData();
  }, []);

  // Render the Profits component
  return (
    <Flex flexDirection="column" align="center" width="90vw">
      <Heading>
        Profit Graph for the last 30 days
      </Heading>
      <Line data={chartData} options={options}/>
    </Flex>
  );
}

export default Profits;
