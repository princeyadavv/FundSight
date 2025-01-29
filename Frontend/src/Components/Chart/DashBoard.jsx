import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
// import { useToken } from "../context/TokenContent"; // Adjust the path
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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // Track progress %
  // Function to simulate progress animation
  const startProgress = () => {
    setProgress(1); // Start from 5% to indicate request started
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 90) {
          return oldProgress + 5; // Gradually increase up to 80%
        }
        return oldProgress;
      });
    }, 120);
    return interval;
  };

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
  const [companiesPerPage] = useState(10); // Show 10 companies per page
  const [investorsPerPage] = useState(10); // Show 10 investors per page

  useEffect(() => {
    const fetchData = async () => {
      const YearFundingData = await sendfunction("fundingdata");
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
    setLoading(true); //
    setProgress(0); //
    const progressInterval = startProgress(); // Start progress animation

    const url = `http://localhost:5000/api/${add}`;
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (data) {
        setProgress(100); // Complete progress immediately
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 500);
        return data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setProgress(0);
    } finally {
      clearInterval(progressInterval); // Stop progress incrementing
    }
  }
  useEffect(() => {
    // Function to fetch data
    const fetchNewData = async (add) => {
      const url = `http://localhost:5000/api/${add}/data?year=${encodeURI(
        selectedYear
      )}&sector=${encodeURI(selectedSector)}&round=${encodeURI(
        selectedRound
      )}&region=${encodeURI(selectedRegion)}`;
      console.log(url); // Log or process the URL before fetching data

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Handle your fetched data
        return data; // Return the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch and set data for all categories
    const xfetchData = async () => {
      let YearFundingData = await fetchNewData("fundingdata");
      setYearFundingData(YearFundingData);

      let yearsData = YearFundingData.map(
        (item) => item.monthYear.split("-")[1]
      );

      const sectorsData = await fetchNewData("sector-distribution");
      setSectors(sectorsData);

      const roundsData = await fetchNewData("funding-round");
      setRounds(roundsData);

      const regionData = await fetchNewData("region-funding");
      setRegions(regionData);

      const topCompanies = await fetchNewData("top-companies");
      setTopCompanies(topCompanies);

      const topInvestors = await fetchNewData("investor-participation");
      setTopInvestors(topInvestors);
    };

    // Only fetch data if the selectedYear, selectedSector, selectedRound, selectedRegion are valid
    if (selectedYear || selectedSector || selectedRound || selectedRegion) {
      xfetchData();
    }
  }, [selectedYear, selectedSector, selectedRound, selectedRegion]);
  // Runs when any of these states change

  const indexOfLastCompany = currentCompanyPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = topCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  // Paginate the investors list
  const indexOfLastInvestor = currentInvestorPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = topInvestors.slice(
    indexOfFirstInvestor,
    indexOfLastInvestor
  );

  // Handle page change for companies
  const paginateCompanies = (pageNumber) => setCurrentCompanyPage(pageNumber);

  // Handle page change for investors
  const paginateInvestors = (pageNumber) => setCurrentInvestorPage(pageNumber);

  // Ensure that data is available before creating the chart data
  const sectorChartData =
    sectors.length > 0
      ? {
          labels: sectors.map((item) => item.sector), // Use sector names as labels
          datasets: [
            {
              data: sectors.map((item) => item.totalFunding), // Use totalFunding for the data
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#FF9F40",
                "#9966FF",
                "#FF3366",
                "#FF5733",
                "#C70039",
                "#900C3F",
              ], // Custom color palette
              hoverBackgroundColor: [
                "#FF4384",
                "#58A2EB",
                "#FFDE56",
                "#4BCC0C",
                "#FFBE40",
                "#A366FF",
                "#FF1F66",
                "#FF8D33",
                "#FF0000",
                "#FF2F53",
              ], // Hover color change
            },
          ],
        }
      : {};

  const regionChartData =
    regions.length > 0
      ? {
          labels: regions.map((item) => item.region), // Use region names as labels
          datasets: [
            {
              label: "Total Funding",
              data: regions.map((item) => item.totalFunding), // Use totalFunding for the data
              backgroundColor: "#36A2EB", // Blue bars
              borderColor: "#0362A1", // Darker blue border
              borderWidth: 1,
            },
          ],
        }
      : {};

  const lineChartData =
    yearFundingData.length > 0
      ? {
          labels: yearFundingData.map((item) => item.monthYear), // Using monthYear as labels
          datasets: [
            {
              label: "Total Funding Over Time",
              data: yearFundingData.map((item) => item.totalFunding), // Funding data
              fill: false,
              borderColor: "#FF5733", // Line color
              tension: 0.1,
            },
          ],
        }
      : {};

  const roundChartData =
    Object.keys(rounds).length > 0
      ? {
          labels: Object.keys(rounds), // Use round names (keys) as labels
          datasets: [
            {
              data: Object.values(rounds), // Use funding amounts (values) for the data
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#FF9F40",
                "#9966FF",
                "#FF3366",
                "#FF5733",
                "#C70039",
                "#900C3F",
              ], // Custom color palette
              hoverBackgroundColor: [
                "#FF4384",
                "#58A2EB",
                "#FFDE56",
                "#4BCC0C",
                "#FFBE40",
                "#A366FF",
                "#FF1F66",
                "#FF8D33",
                "#FF0000",
                "#FF2F53",
              ], // Hover color change
            },
          ],
        }
      : {};

  // Region Chart options (config for Bar chart)
  const regionChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Region",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Funding ($)",
        },
        beginAtZero: true,
      },
    },
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Month-Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Funding ($)",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-fit center flex-col">
      {/* Progress Bar */}
      {loading && (
        <div
          className="fixed top-0 left-0 h-1 bg-[#4e52b4] z-50 transition-all ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      )}
  
      <div className="w-[90vw] md:w-[70vw] min-h-[20vh] center flex-col md:flex-row gap-6 my-2 rounded-2xl">
        <div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="button2"
          >
            <option value="">Select Year</option>
            {years.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="button2"
          >
            <option value="">Select Sector</option>
            {sectors.map((item, index) => (
              <option key={index} value={item.sector}>
                {item.sector}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(e.target.value)}
            className="button2"
          >
            <option value="">Select Round</option>
            {Object.keys(rounds).map((roundKey, index) => (
              <option key={index} value={roundKey}>
                {roundKey}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="button2"
          >
            <option value="">Select Region</option>
            {regions.map((item, index) => (
              <option key={index} value={item.region}>
                {item.region}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      <div className="w-[90vw] md:w-[95vw] min-h-[60vh] py-10 center flex-col md:flex-row gap-10">
        {/* Display Sector Pie Chart */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Sector Funding Distribution
          </h3>
          {sectors.length > 0 && (
            <div className="flex justify-center">
              <Pie
                data={sectorChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                className="w-full h-full md:w-140 md:h-100"
              />
            </div>
          )}
        </div>
        {/* Display Region Bar Chart */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Region Funding Distribution
          </h3>
          {regions.length > 0 && (
            <div className="flex justify-center">
              <Bar
                data={regionChartData}
                options={{
                  ...regionChartOptions,
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="w-full h-full md:w-140 md:h-100"
              />
            </div>
          )}
        </div>
      </div>
  
      <div className="w-[90vw] md:w-[95vw] min-h-[60vh] py-10 center flex-col md:flex-row gap-10">
        {/* Display Round Pie Chart */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Round Funding Distribution
          </h3>
          {Object.keys(rounds).length > 0 && (
            <div className="flex justify-center">
              <Pie
                data={roundChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
                className="w-full h-full md:w-140 md:h-100"
              />
            </div>
          )}
        </div>
        {/* Display Line Chart for Yearly Funding */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Total Funding Over Time (Line Chart)
          </h3>
          {yearFundingData.length > 0 && (
            <div className="flex justify-center">
              <Line
                data={lineChartData}
                options={{
                  ...lineChartOptions,
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                className="w-full h-full md:w-140 md:h-100"
              />
            </div>
          )}
        </div>
      </div>
  
      <div className="w-[90vw] md:w-[95vw] min-h-[60vh] py-10 center flex-col md:flex-row gap-10">
        {/* Display Top Companies Leaderboard */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Top Companies Leaderboard
          </h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">
                  Company
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">
                  Total Funding
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCompanies.map((company, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{company.company}</td>
                  <td className="px-4 py-2">{company.totalFunding}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Pagination Controls for Companies */}
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from(
              { length: Math.ceil(topCompanies.length / companiesPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginateCompanies(index + 1)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
  
        {/* Display Top Investors Leaderboard */}
        <div className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Top Investors Leaderboard
          </h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">
                  Investor
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-600">
                  Participation Count
                </th>
              </tr>
            </thead>
            <tbody>
              {currentInvestors.map((investorData, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{investorData.investor}</td>
                  <td className="px-4 py-2">{investorData.participationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Pagination Controls for Investors */}
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from(
              { length: Math.ceil(topInvestors.length / investorsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginateInvestors(index + 1)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}
