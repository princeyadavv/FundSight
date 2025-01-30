const fs = require('fs');
const path = require('path');
const content = require('../models/content')
function filterData(arr, year, round, sector, city) {

    if (year) {
        arr = arr.filter((item) => {
            const itemYear = item.date.split('-')[0];  
            return itemYear === year; 
        });
    }

    if (round) {
        arr = arr.filter((item) => round.toLowerCase() === item.round.toLowerCase());
    }

    if (sector) {
        arr = arr.filter((item) => item.vertical.toLowerCase().includes(sector.toLowerCase()));
    }

    if (city) {
        arr = arr.filter((item) => item.city.toLowerCase() === city.toLowerCase());
    }

    return arr;
}

async function getDataFromDatabase(contentid) {
    const data = await content.findById(contentid);
    console.log("yeh wala data")
    console.log(data)
    const realdata = data.content
    return realdata
}

  
function newfundingdata(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city); 

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

function newsectorDistribution(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city);  
    
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
        .slice(0, 10); 

    return topSectors;
}

function newtopPerformingCompanies(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city); 
    
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
        .slice(0, 50); 

    return topCompanies;
}

function newfundingRound(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city);  
    
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

function newregionFunding(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city);  
    
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

function newinvestorParticipation(arr, year, round, sector, city) {
    arr = filterData(arr, year, round, sector, city); 
    
    const investorCounts = arr.reduce((accum, curr) => {
        const investors = curr.investors
            .split(',')
            .map(name => name.trim())
            .filter(name => name); 
        
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



module.exports = {
    newfundingdata,
    newsectorDistribution,
    newtopPerformingCompanies,
    newfundingRound,
    newregionFunding,
    newinvestorParticipation,
    getDataFromDatabase
};
