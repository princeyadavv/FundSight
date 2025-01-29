import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

// Register necessary components for chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export default function DashBoard() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedRound, setSelectedRound] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [years, setYears] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [rounds, setRounds] = useState({});
  const [regions, setRegions] = useState([]);
  const [yearFundingData, setYearFundingData] = useState([]);
  const [topCompanies, setTopCompanies] = useState([]);
  const [topInvestors, setTopInvestors] = useState([]);
  const [currentCompanyPage, setCurrentCompanyPage] = useState(1);
  const [currentInvestorPage, setCurrentInvestorPage] = useState(1);
  const [companiesPerPage] = useState(10);
  const [investorsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      let YearFundingData = await sendfunction("fundingdata");
      setYearFundingData(YearFundingData);
      let yearsData = YearFundingData.map(
        (item) => item.monthYear.split("-")[1]
      );
      const yearsSet = new Set(yearsData);
      setYears([...yearsSet]);
      const sectorsData = await sendfunction("sector-distribution");
      setSectors(sectorsData);
      const roundsData = await sendfunction("funding-round");
      setRounds(roundsData);
      const regionData = await sendfunction("region-funding");
      setRegions(regionData);
      const topCompanies = await sendfunction("top-companies");
      setTopCompanies(topCompanies);
      const topInvestors = await sendfunction("investor-participation");
      setTopInvestors(topInvestors);
    };
    fetchData();
  }, [selectedYear, selectedSector, selectedRound, selectedRegion]);

  async function sendfunction(add) {

    const url = `http://localhost:5000/api/${add}`;
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const paginateCompanies = (pageNumber) => setCurrentCompanyPage(pageNumber);
  const paginateInvestors = (pageNumber) => setCurrentInvestorPage(pageNumber);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Funding Dashboard</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option value="">All Sectors</option>
          {sectors.map((item, index) => (
            <option key={index} value={item.sector}>
              {item.sector}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={selectedRound}
          onChange={(e) => setSelectedRound(e.target.value)}
        >
          <option value="">All Rounds</option>
          {Object.keys(rounds).map((roundKey, index) => (
            <option key={index} value={roundKey}>
              {roundKey}
            </option>
          ))}
        </select>
        <select
          className="p-2 border rounded"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {regions.map((item, index) => (
            <option key={index} value={item.region}>
              {item.region}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">
          Sector Funding Distribution
        </h3>
        <Pie
          data={{
            labels: sectors.map((i) => i.sector),
            datasets: [
              {
                data: sectors.map((i) => i.totalFunding),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          }}
        />
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">
          Region Funding Distribution
        </h3>
        <Bar
          data={{
            labels: regions.map((i) => i.region),
            datasets: [
              {
                label: "Total Funding",
                data: regions.map((i) => i.totalFunding),
                backgroundColor: "#36A2EB",
              },
            ],
          }}
        />
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Total Funding Over Time</h3>
        <Line
          data={{
            labels: yearFundingData.map((i) => i.monthYear),
            datasets: [
              {
                label: "Funding",
                data: yearFundingData.map((i) => i.totalFunding),
                borderColor: "#FF5733",
              },
            ],
          }}
        />
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Top Companies</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Company</th>
              <th>Funding</th>
            </tr>
          </thead>
          <tbody>
            {topCompanies
              .slice((currentCompanyPage - 1) * 10, currentCompanyPage * 10)
              .map((c, index) => (
                <tr key={index} className="border-b">
                  <td>{c.company}</td>
                  <td>{c.totalFunding}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex mt-2 space-x-2">
          {Array.from({ length: Math.ceil(topCompanies.length / 10) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => paginateCompanies(i + 1)}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
