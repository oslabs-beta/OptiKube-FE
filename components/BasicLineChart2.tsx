import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    {
        name: 'Day 1',
        DummyNGINX: 27.2,
        DummyPHP: 32.50,
        amt: 2400,
    },
    {
        name: 'Day 2',
        DummyNGINX: 22.7,
        DummyPHP: 25.42,
        amt: 2210,
    },
    {
        name: 'Day 3',
        DummyNGINX: 25.3,
        DummyPHP: 17.60,
        amt: 2290,
    },
    {
        name: 'Day 4',
        DummyNGINX: 19.3,
        DummyPHP: 14.03,
        amt: 2000,
    },
    {
        name: 'Day 5',
        DummyNGINX: 15.6,
        DummyPHP: 13.21,
        amt: 2181,
    },
    {
        name: 'Day 6',
        DummyNGINX: 13.2,
        DummyPHP: 12.07,
        amt: 2500,
    },
    {
        name: 'Day 7',
        DummyNGINX: 11.11,
        DummyPHP: 12.14,
        amt: 2100,
    },
];
export function BasicLineChart2() {

    // render(){
        return (
            <div>
                {/* <h3>
                    Fake kubecost metrics!
                </h3> */}

                {/* <ResponsiveContainer width="100%" height="100%"> */}
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
        )
    // }
}