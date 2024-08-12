"use client"; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then((response) => response.json())
      .then((data) => setVehicleTypes(data.Results))
      .catch((error) => console.error('Error fetching vehicle types:', error));
  }, []);

  const years = Array.from(new Array(new Date().getFullYear() - 2014), (_, index) => 2015 + index);

  const handleNext = () => {
    if (selectedVehicleType && selectedYear) {
      router.push(`/result/${selectedVehicleType}/${selectedYear}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Car Dealer App</h1>
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Select Vehicle Type:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVehicleType}
            onChange={(e) => setSelectedVehicleType(e.target.value)}
          >
            <option value="">--Select Vehicle Type--</option>
            {vehicleTypes.map((type) => (
              <option key={type.MakeId} value={type.MakeId}>
                {type.MakeName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Select Model Year:</label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">--Select Model Year--</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            selectedVehicleType && selectedYear
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedVehicleType || !selectedYear}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
