const express = require('express');
const multer = require('multer');
const {createPost,converter} = require('../controllers/content');
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const {fundingRound,fundingdata,sectorDistribution,investorParticipation,regionFunding,topPerformingCompanies} = require('../services/functions')
const {newfundingdata,getDataFromDatabase} = require('../services/newfunction')


router.post("/upload", upload.single("file"),converter)
router.post('/create', createPost);

router.get('/api/new/fundingdata/data',(req,res)=>{

  const year = req.query.year
  const data = getDataFromDatabase();

  const result = newfundingdata(data,year)
  return res.status(200).json(result)
})
router.get('/api/fundingdata', (req, res) => {
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

module.exports = router;
