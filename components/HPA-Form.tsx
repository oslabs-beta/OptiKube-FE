import React from 'react';
import { useForm } from "react-hook-form";

export default function HPAForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="App p-5">
            
            <h2 className="bg-gradient-to-br from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text text-6xl font-bold text-center">
                HPA Form Component
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control border p-4 rounded-lg shadow">
                    <label htmlFor="input1" className="block mb-2 text-sm font-medium text-gray-900">Input 1</label>
                    <input
                        type="text"
                        id="input1"
                        name="input1"
                        {...register("input1")}
                        className="block w-full p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-control border p-4 rounded-lg shadow">
                    <label htmlFor="input2" className="block mb-2 text-sm font-medium text-gray-900">Input 2</label>
                    <input
                        type="text"
                        id="input2"
                        name="input2"
                        {...register("input2")}
                        className="block w-full p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="form-control border p-4 rounded-lg shadow">
                    <label htmlFor="dropdown" className="block mb-2 text-sm font-medium text-gray-900">Scaling options</label>
                    <select
                        id="dropdown"
                        name="dropdown"
                        {...register("dropdown")}
                        className="block w-full p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div className="form-control border p-4 rounded-lg shadow">
                    <label htmlFor="slider" className="block mb-2 text-sm font-medium text-gray-900">Select Number of Pods</label>
                    <input
                        type="range"
                        id="slider"
                        name="slider"
                        min="1"
                        max="4"
                        step="1"
                        {...register("slider")}
                        className="block w-full p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="flex justify-between text-gray-700">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                    </div>
                </div>

                <div className="form-control border p-4 rounded-lg shadow">
              <label htmlFor="radioGroup" className="block mb-2 text-sm font-medium text-gray-900">Select a number (Radio Buttons)</label>
              <div id="radioGroup" className="flex justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="1"
                    name="number"
                    {...register("number")}
                    className="form-radio"
                  />
                  <span className="ml-2">1</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="2"
                    name="number"
                    {...register("number")}
                    className="form-radio"
                  />
                  <span className="ml-2">2</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="3"
                    name="number"
                    {...register("number")}
                    className="form-radio"
                  />
                  <span className="ml-2">3</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="4"
                    name="number"
                    {...register("number")}
                    className="form-radio"
                  />
                  <span className="ml-2">4</span>
                </label>
              </div>
            </div>

                <div className="form-control">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto text-center"
                    >
                        Log data to console
                    </button>
                </div>
            </form>
        </div>
    );
}
