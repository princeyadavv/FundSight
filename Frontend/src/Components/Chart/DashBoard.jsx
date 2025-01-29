import React, { useState, useEffect } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';

// Register necessary components for chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

export default function DashBoard() {
  const [selectedOption, setSelectedOption] = useState('');
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

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      let YearFundingData = await sendfunction('fundingdata');
      setYearFundingData(YearFundingData); // Store the funding data
      let yearsData = YearFundingData.map((item) => item.monthYear.split('-')[1]);
      const yearsSet = new Set(yearsData);
      setYears([...yearsSet]);

      const sectorsData = await sendfunction('sector-distribution');
      setSectors(sectorsData);

      const roundsData = await sendfunction('funding-round');
      setRounds(roundsData);

      const regionData = await sendfunction('region-funding');
      setRegions(regionData);
      const topCompanies = await sendfunction('top-companies');
      setTopCompanies(topCompanies); // Store the top companies
      const topInvestors = await sendfunction('investor-participation');
      setTopInvestors(topInvestors); // Store the top investors
    };

    fetchData();

    return () => {
      console.log('Cleanup');
    };
  }, []);

  async function sendfunction(add) {
    const url = `http://localhost:5000/api/${add}`;
    try {
      const res = await fetch(url, { method: 'GET' });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Paginate the companies list
  const indexOfLastCompany = currentCompanyPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = topCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Paginate the investors list
  const indexOfLastInvestor = currentInvestorPage * investorsPerPage;
  const indexOfFirstInvestor = indexOfLastInvestor - investorsPerPage;
  const currentInvestors = topInvestors.slice(indexOfFirstInvestor, indexOfLastInvestor);

  // Handle page change for companies
  const paginateCompanies = (pageNumber) => setCurrentCompanyPage(pageNumber);

  // Handle page change for investors
  const paginateInvestors = (pageNumber) => setCurrentInvestorPage(pageNumber);

  // Ensure that data is available before creating the chart data
  const sectorChartData = sectors.length > 0 ? {
    labels: sectors.map((item) => item.sector), // Use sector names as labels
    datasets: [
      {
        data: sectors.map((item) => item.totalFunding), // Use totalFunding for the data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
          '#9966FF',
          '#FF3366',
          '#FF5733',
          '#C70039',
          '#900C3F',
        ], // Custom color palette
        hoverBackgroundColor: [
          '#FF4384',
          '#58A2EB',
          '#FFDE56',
          '#4BCC0C',
          '#FFBE40',
          '#A366FF',
          '#FF1F66',
          '#FF8D33',
          '#FF0000',
          '#FF2F53',
        ], // Hover color change
      },
    ],
  } : {};

  const regionChartData = regions.length > 0 ? {
    labels: regions.map((item) => item.region), // Use region names as labels
    datasets: [
      {
        label: 'Total Funding',
        data: regions.map((item) => item.totalFunding), // Use totalFunding for the data
        backgroundColor: '#36A2EB', // Blue bars
        borderColor: '#0362A1', // Darker blue border
        borderWidth: 1,
      },
    ],
  } : {};

  const lineChartData = yearFundingData.length > 0 ? {
    labels: yearFundingData.map((item) => item.monthYear), // Using monthYear as labels
    datasets: [
      {
        label: 'Total Funding Over Time',
        data: yearFundingData.map((item) => item.totalFunding), // Funding data
        fill: false,
        borderColor: '#FF5733', // Line color
        tension: 0.1,
      },
    ],
  } : {};

  const roundChartData = Object.keys(rounds).length > 0 ? {
    labels: Object.keys(rounds), // Use round names (keys) as labels
    datasets: [
      {
        data: Object.values(rounds), // Use funding amounts (values) for the data
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#FF9F40',
          '#9966FF',
          '#FF3366',
          '#FF5733',
          '#C70039',
          '#900C3F',
        ], // Custom color palette
        hoverBackgroundColor: [
          '#FF4384',
          '#58A2EB',
          '#FFDE56',
          '#4BCC0C',
          '#FFBE40',
          '#A366FF',
          '#FF1F66',
          '#FF8D33',
          '#FF0000',
          '#FF2F53',
        ], // Hover color change
      },
    ],
  } : {};

  // Region Chart options (config for Bar chart)
  const regionChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Region',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Funding ($)',
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
          text: 'Month-Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Funding ($)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2>Select Options:</h2>

      <select value={selectedOption} onChange={handleChange}>
        <option value="">All</option>
        {years.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select>
        <option value="">All</option>
        {sectors.map((item, index) => (
          <option key={index} value={item.sector}>
            {item.sector}
          </option>
        ))}
      </select>

      <select>
        <option value="">All</option>
        {Object.keys(rounds).map((roundKey, index) => (
          <option key={index} value={roundKey}>
            {roundKey}
          </option>
        ))}
      </select>

      <select>
        <option value="">All</option>
        {regions.map((item, index) => (
          <option key={index} value={item.region}>
            {item.region}
          </option>
        ))}
      </select>

      {/* Display Sector Pie chart */}
      <div>
        <h3>Sector Funding Distribution</h3>
        {sectors.length > 0 && <Pie data={sectorChartData} options={{ responsive: true }} />}
      </div>

      {/* Display Region Bar chart */}
      <div>
        <h3>Region Funding Distribution</h3>
        {regions.length > 0 && <Bar data={regionChartData} options={regionChartOptions} />}
      </div>

      {/* Display Round Pie chart */}
      <div>
        <h3>Round Funding Distribution</h3>
        {Object.keys(rounds).length > 0 && <Pie data={roundChartData} options={{ responsive: true }} />}
      </div>

      {/* Display Line chart for Yearly Funding */}
      <div>
        <h3>Total Funding Over Time (Line Chart)</h3>
        {yearFundingData.length > 0 && <Line data={lineChartData} options={lineChartOptions} />}
      </div>

      {/* Display Top Companies Leaderboard */}
      <div>
        <h3>Top Companies Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Total Funding</th>
            </tr>
          </thead>
          <tbody>
            {currentCompanies.map((company, index) => (
              <tr key={index}>
                <td>{company.company}</td>
                <td>{company.totalFunding}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls for Companies */}
        <div>
          {Array.from({ length: Math.ceil(topCompanies.length / companiesPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginateCompanies(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Display Top Investors Leaderboard */}
      <div>
        <h3>Top Investors Leaderboard</h3>
        <table>
          <thead>
            <tr>
              <th>Investor</th>
              <th>Participation Count</th>
            </tr>
          </thead>
          <tbody>
            {currentInvestors.map((investorData, index) => (
              <tr key={index}>
                <td>{investorData.investor}</td>
                <td>{investorData.participationCount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls for Investors */}
        <div>
          {Array.from({ length: Math.ceil(topInvestors.length / investorsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginateInvestors(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}