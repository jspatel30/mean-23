const CsvReadService  = require("../services/csv-reader")
const IndustryModel = require("../model/industryModel")

module.exports.uploadIndustry = async function(req,res){
    let Industries = await CsvReadService.uploadIndustry()

    IndustryModel.insertMany(Industries).then(data=>{
        res.json({data:data,"msg":"Industry uploaded",rescode:200})
    })
    
}