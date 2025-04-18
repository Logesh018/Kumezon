import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const generateRandomData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString('default', { month: 'short' }),
    revenue: Math.floor(Math.random() * 10000) + 1000,
    users: Math.floor(Math.random() * 5000) + 500,
  }));
};

const generateCategoryData = () => {
  return [
    { name: 'Electronics', value: Math.floor(Math.random() * 1000) + 100 },
    { name: 'Clothing', value: Math.floor(Math.random() * 1000) + 100 },
    { name: 'Books', value: Math.floor(Math.random() * 1000) + 100 },
    { name: 'Home & Kitchen', value: Math.floor(Math.random() * 1000) + 100 },
  ];
};

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AnalyticsTab = () => {
  const [data, setData] = useState(generateRandomData());
  const [categoryData, setCategoryData] = useState(generateCategoryData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
      setCategoryData(generateCategoryData());
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid gap-6 p-4 sm:grid-cols-2'>
      <div className='rounded-lg bg-gray-800 p-4 shadow-lg'>
        <h2 className='text-white text-lg font-semibold mb-4'>Monthly Revenue</h2>
        <ResponsiveContainer width='100%' height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#444' />
            <XAxis dataKey='month' stroke='#ccc' />
            <YAxis stroke='#ccc' />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Line type='monotone' dataKey='revenue' stroke='#8884d8' strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className='rounded-lg bg-gray-800 p-4 shadow-lg'>
        <h2 className='text-white text-lg font-semibold mb-4'>User Growth</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' stroke='#444' />
            <XAxis dataKey='month' stroke='#ccc' />
            <YAxis stroke='#ccc' />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} labelStyle={{ color: '#fff' }} />
            <Legend />
            <Bar dataKey='users' fill='#00C49F' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className='rounded-lg bg-gray-800 p-4 shadow-lg sm:col-span-2'>
        <h2 className='text-white text-lg font-semibold mb-4 text-center'>Top Categories</h2>
        <ResponsiveContainer width='100%' height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx='50%'
              cy='50%'
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={120}
              fill='#8884d8'
              dataKey='value'
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} labelStyle={{ color: '#10b981' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsTab;
