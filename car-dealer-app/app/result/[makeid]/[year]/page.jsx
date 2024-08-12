"use client";  

import { useEffect, useState } from 'react';

export default function ResultPage({ params }) {
  const { makeid, year } = params;
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeid}/modelyear/${year}?format=json`
        );
        const data = await response.json();
        setModels(data.Results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vehicle models:', error);
        setLoading(false);
      }
    };

    fetchModels();
  }, [makeid, year]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vehicle Models for {year}</h1>
      <ul className="w-full max-w-4xl list-disc pl-8">
        {models.length ? (
          models.map((model) => (
            <li key={model.Model_ID} className="py-2 text-gray-700 border-b border-gray-300">
              {model.Model_Name}
            </li>
          ))
        ) : (
          <li className="py-2 text-gray-700">No models available</li>
        )}
      </ul>
    </div>
  );
}
