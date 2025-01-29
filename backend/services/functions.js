const fs = require('fs');
const path = require('path');
function fundingdata(arr) {
  const fundingTrend = arr.reduce((accum, curr) => {
    const date = new Date(curr.date);
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
    
    if (!accum[monthYear]) {
      accum[monthYear] = 0;
    }
    accum[monthYear] += parseInt(curr.amount || 0);
    
    return accum;
  }, {});
  
  const trendData = Object.keys(fundingTrend).map(key => ({
    monthYear: key,
    totalFunding: fundingTrend[key]
  }));
  
  return trendData;
}

function sectorDistribution(arr) {
  const sectorFunding = arr.reduce((accum, curr) => {
    const vertical = curr.vertical.toLowerCase().trim();

    if (!accum[vertical]) {
      accum[vertical] = 0;
    }

    accum[vertical] += parseInt(curr.amount || 0);

    return accum;
  }, {});

  const topSectors = Object.keys(sectorFunding)
    .map(sector => ({
      sector,
      totalFunding: sectorFunding[sector]
    }))
    .sort((a, b) => b.totalFunding - a.totalFunding)
    .slice(0, 10); // Limit to top 10 sectors

  return topSectors;
}



function topPerformingCompanies(arr) {
  const companyFunding = arr.reduce((accum, curr) => {
    const company = curr.startup;

    if (!accum[company]) {
      accum[company] = 0;
    }

    accum[company] += parseInt(curr.amount || 0);

    return accum;
  }, {});

  const topCompanies = Object.keys(companyFunding)
    .map(company => ({
      company,
      totalFunding: companyFunding[company]
    }))
    .sort((a, b) => b.totalFunding - a.totalFunding)
    .slice(0, 50); // Limit the result to the top 50 companies

  return topCompanies;
}


function fundingRound(arr) {
  const roundFunding = arr.reduce((accum, curr) => {
    // Check if round exists and is not undefined
    const round = curr.round ? curr.round.toLowerCase() : 'unknown';  // Fallback to 'unknown' if round is missing

    if (!accum[round]) {
      accum[round] = 0;
    }

    accum[round] += parseInt(curr.amount || 0);

    return accum;
  }, {});

  return roundFunding;
}

function regionFunding(arr) {
  const regionFunding = arr.reduce((accum, curr) => {
    const region = curr.city || 'Unknown';

    if (!accum[region]) {
      accum[region] = 0;
    }

    accum[region] += parseInt(curr.amount || 0);

    return accum;
  }, {});

  const topRegions = Object.keys(regionFunding)
    .map(region => ({
      region,
      totalFunding: regionFunding[region]
    }))
    .sort((a, b) => b.totalFunding - a.totalFunding)
    .slice(0, 10); // Limit to top 10 regions

  return topRegions;
}


function investorParticipation(arr) {
  const investorCounts = arr.reduce((accum, curr) => {
    const investors = curr.investors
      .split(',')
      .map(name => name.trim()) // Remove extra spaces
      .filter(name => name);   // Exclude empty strings

    investors.forEach(investor => {
      if (!accum[investor]) {
        accum[investor] = 0;
      }

      accum[investor] += 1;
    });

    return accum;
  }, {});

  const topInvestors = Object.keys(investorCounts)
    .map(investor => ({
      investor,
      participationCount: investorCounts[investor]
    }))
    .sort((a, b) => b.participationCount - a.participationCount)
    .slice(0, 50); // Limit to top 50 investors

  return topInvestors;
}

function getDataFromDatabase() {
  const filePath = path.join(__dirname, 'result.json'); // Path to the result.json file

  try {
    // Read and parse the JSON data
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading or parsing the database file:', error);
    return [];
  }
}

module.exports = {
  fundingdata,
  sectorDistribution,
  topPerformingCompanies,
  fundingRound,
  regionFunding,
  investorParticipation,
  getDataFromDatabase
};
