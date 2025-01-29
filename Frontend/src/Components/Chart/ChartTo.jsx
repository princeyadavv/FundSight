import React, { useState } from "react";

export default function ChartTO() {
  const [options, setOptions] = useState({
    select1: "",
    select2: "",
    select3: "",
    select4: "",
  });

  const [data, setData] = useState({
    sector: {},
    totalFunding: [],
    fundingData: [],
    sectorDistribution: [],
    topCompanies: [],
    fundingRound: [],
    regionFunding: [],
    investorParticipation: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    async function sendfunction(add) {
      const url = `http://localhost:5000/api/${add}`;
      try {
        const res = await fetch(url, {
          method: "GET",
        });
        const responseData = await res.json();
        const detailedData = await Promise.all(responseData);
        // console.log("detaileddatta",detailedData);
        function printAllObjects(arr) {
          arr.forEach((item, index) => {
            console.log(`Object ${index + 1}:`, item);
          });
        }
        printAllObjects(detailedData);
        // console.log(responseData);
        return responseData;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const fundingData = await sendfunction("fundingdata");
    const sectorDistribution = await sendfunction("sector-distribution");
    const topCompanies = await sendfunction("top-companies");
    // const fundingRound = await sendfunction("funding-round");
    const regionFunding = await sendfunction("region-funding");
    const investorParticipation = await sendfunction("investor-participation");

    // Set all arrays and the object from the fetched data
    setData({
      sector: fundingData.sector || {},
      // totalFunding: fundingData?.totalFunding || [],
      // fundingData: fundingData?.data || [],
      // sectorDistribution: sectorDistribution || [],
      // topCompanies: topCompanies || [],
      // fundingRound: fundingRound || [],
      // regionFunding: regionFunding || [],
      // investorParticipation: investorParticipation || [],
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Select Options</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select options */}
        <select
          name="select1"
          value={options.select1}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Option 1</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
        </select>

        <select
          name="select2"
          value={options.select2}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Option 2</option>
          <option value="optionA">Option A</option>
          <option value="optionB">Option B</option>
        </select>

        <select
          name="select3"
          value={options.select3}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Option 3</option>
          <option value="value1">Value 1</option>
          <option value="value2">Value 2</option>
        </select>

        <select
          name="select4"
          value={options.select4}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        >
          <option value="">Select Option 4</option>
          <option value="choiceX">Choice X</option>
          <option value="choiceY">Choice Y</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full"
        >
          Submit
        </button>
      </form>

      {/* Response Area */}
      <div className="mt-4 p-4 border rounded bg-gray-50">
        <h2 className="font-bold">Response:</h2>

        {/* Display the arrays in columns */}
        <div className="grid grid-cols-4 gap-4">
          <div className="p-2">
            <h3 className="font-semibold">Funding Data</h3>
            <ul className="space-y-2"></ul>
          </div>

          <div className="p-2">
            <h3 className="font-semibold">Sector Distribution</h3>
            <ul>
              {/* {data.sectorDistribution.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))} */}
            </ul>
          </div>

          <div className="p-2">
            <h3 className="font-semibold">Top Companies</h3>
            <ul>
              {/* {data.topCompanies.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))} */}
            </ul>
          </div>

          <div className="p-2">
            <h3 className="font-semibold">Funding Round</h3>
            <ul>
              {/* {data.fundingRound.map((item, index) => (
                <li key={index}>{JSON.stringify(item)}</li>
              ))} */}
            </ul>
          </div>
        </div>

        {/* Display remaining data if needed */}
        <div className="mt-4">
          <h3 className="font-semibold">Region Funding:</h3>
          {/* <pre>{JSON.stringify(data.regionFunding, null, 2)}</pre> */}

          <h3 className="font-semibold">Investor Participation:</h3>
          {/* <pre>{JSON.stringify(data.investorParticipation, null, 2)}</pre> */}
        </div>
      </div>
    </div>
  );
}
