const express = require('express')
const router = express.Router()

const{handleLogin,handleSignup,} = require('../controllers/staticrouter')
const{getDataFromDatabase} = require("../services/functions")
const {newfundingdata,newfundingRound,newinvestorParticipation,newsectorDistribution,newtopPerformingCompanies,newregionFunding} = require('../services/newfunction')


router.post('/login',handleLogin)
router.post('/signup',handleSignup)
router.get('/dashboard',)

router.get('/fundingdata/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newfundingdata(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
  
  router.get('/sector-distribution/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newsectorDistribution(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
  
  router.get('/top-companies/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newtopPerformingCompanies(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
  
  router.get('/funding-round/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newfundingRound(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
  
  router.get('/region-funding/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newregionFunding(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
  
  router.get('/investor-participation/data', (req, res) => {
    const year = req.query.year
    const city = decodeURI(req.query.region)
    const round = decodeURI(req.query.round)
    const sector = decodeURI(req.query.sector)
    const data = getDataFromDatabase();
  
    const result = newinvestorParticipation(data,year,round,sector,city)
    console.log(result)
    return res.status(200).json(result)
  });
module.exports = router