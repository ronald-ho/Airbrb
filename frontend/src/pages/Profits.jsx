import React, { useEffect, useState } from 'react';
import { getProfitData } from '../api/booking';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Flex, Heading } from '@chakra-ui/react';

function Profits () {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

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
