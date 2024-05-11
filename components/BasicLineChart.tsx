import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Day 1',
        DummyNGINX: 27.2,
        DummyPHP: 32.25,
        amt: 2400,
    },
    {
        name: 'Day 2',
        DummyNGINX: 32.5,
        DummyPHP: 25.42,
        amt: 2210,
    },
    {
        name: 'Day 3',
        DummyNGINX: 37,
        DummyPHP: 37.60,
        amt: 2290,
    },
    {
        name: 'Day 4',
        DummyNGINX: 35.4,
        DummyPHP: 47.03,
        amt: 2000,
    },
    {
        name: 'Day 5',
        DummyNGINX: 47.2,
        DummyPHP: 62.21,
        amt: 2181,
    },
    {
        name: 'Day 6',
        DummyNGINX: 59.3,
        DummyPHP: 71.07,
        amt: 2500,
    },
    {
        name: 'Day 7',
        DummyNGINX: 67,
        DummyPHP: 83.04,
        amt: 2100,
    },
];
export function BasicLineChart() {

    // render(){
        return (
            <div>
                <div className='bg-slate-800'>
                    <LineChart
                        width={550}
                        height={200}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="DummyPHP" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="DummyNGINX" stroke="#82ca9d" />
                    </LineChart>
                {/* </ResponsiveContainer> */}
                </div>
            </div>
        )
}