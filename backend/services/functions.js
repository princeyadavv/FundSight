const fs = require('fs');
const path = require('path');
function fundingdata(arr) {
  
  if (!Array.isArray(arr)) {
    
    return [];  
  }

  const fundingTrend = arr.reduce((accum, curr) => {
    
    const date = new Date(curr.date);
    if (isNaN(date)) {
      
      return accum;  
    }

    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

    if (!accum[monthYear]) {
      accum[monthYear] = 0;
    }

    
    const amount = parseInt(curr.amount || 0);
    if (!isNaN(amount)) {
      accum[monthYear] += amount;
    } else {
      
    }

    return accum;
  }, {});

  const trendData = Object.keys(fundingTrend).map(key => ({
    monthYear: key,
    totalFunding: fundingTrend[key]
  }));

  return trendData;
}

function sectorDistribution(arr) {
  if (!Array.isArray(arr)) {
    
    return [];  
  }

  const sectorFunding = arr.reduce((accum, curr) => {
    const vertical = curr.vertical ? curr.vertical.toLowerCase().trim() : 'unknown';

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
    .slice(0, 10); 

  return topSectors;
}




function topPerformingCompanies(arr) {
  if (!Array.isArray(arr)) {
    
    return [];  
  }

  const companyFunding = arr.reduce((accum, curr) => {
    const company = curr.startup || 'Unknown';

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
    .slice(0, 50); 

  return topCompanies;
}



function fundingRound(arr) {
  if (!Array.isArray(arr)) {
    
    return {};  
  }

  const roundFunding = arr.reduce((accum, curr) => {
    const round = curr.round ? curr.round.toLowerCase() : 'unknown';  

    if (!accum[round]) {
      accum[round] = 0;
    }

    accum[round] += parseInt(curr.amount || 0);

    return accum;
  }, {});

  return roundFunding;
}

function regionFunding(arr) {
  if (!Array.isArray(arr)) {
    
    return [];  
  }

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
    .slice(0, 10); 

  return topRegions;
}



function investorParticipation(arr) {
  if (!Array.isArray(arr)) {
    
    return [];  
  }

  const investorCounts = arr.reduce((accum, curr) => {
    const investors = curr.investors
      ? curr.investors.split(',').map(name => name.trim()).filter(name => name) 
      : [];

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
    .slice(0, 50); 

  return topInvestors;
}

function getDataFromDatabase() {
  const filePath = path.join(__dirname, 'result.json'); 

  try {
    
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    
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
