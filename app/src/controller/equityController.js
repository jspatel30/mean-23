const CsvReadService  = require("../services/csv-reader")
const EquityModel = require("../model/equityModel")

module.exports.uploadEquity = async function uploadEquity(req,res)
{
    let allEquity = await CsvReadService.uploadEquity()
    console.log("Equity in Contoller")
    console.log(allEquity)

    EquityModel.insertMany(allEquity).then(data=>{
        res.json({msg:"Equity  Uploaded",data:data,status:200})
    })
}

module.exports.getAllEquity = function getAllEquity(req,res)
{
    EquityModel.find().populate("IndustryID").exec().then((data)=>{
        res.status(200).json({"msg":"Equity Populated",data:data})
    })
}