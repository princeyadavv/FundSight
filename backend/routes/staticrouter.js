const express = require('express')
const router = express.Router()

const{handleLogin,handleSignup,} = require('../controllers/staticrouter')
const {fundingRound,fundingdata,sectorDistribution,investorParticipation,regionFunding,topPerformingCompanies,getDataFromDatabase} = require('../services/functions')


router.post('/login',handleLogin)
router.post('/signup',handleSignup)
router.get('/dashboard',)

router.get('/api/fundingdata', (req, res) => {
    console.log('request aagyi')
    const data = getDataFromDatabase();
    const result = fundingdata(data);
    res.json(result);
  });
  
  router.get('/api/sector-distribution', (req, res) => {
    const data = getDataFromDatabase();
    const result = sectorDistribution(data);
    res.json(result);
  });
  
  router.get('/api/top-companies', (req, res) => {
    const data = getDataFromDatabase();
    const result = topPerformingCompanies(data);
    res.json(result);
  });
  
  router.get('/api/funding-round', (req, res) => {
    const data = getDataFromDatabase();
    const result = fundingRound(data);
    res.json(result);
  });
  
  router.get('/api/region-funding', (req, res) => {
    const data = getDataFromDatabase();
    const result = regionFunding(data);
    res.json(result);
  });
  
  router.get('/api/investor-participation', (req, res) => {
    const data = getDataFromDatabase();
    const result = investorParticipation(data);
    res.json(result);
  });
module.exports = router