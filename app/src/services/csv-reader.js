const fs = require("fs")
const CsvReader = require("csv-reader")
const IndustryModel = require("../model/industryModel")
const EquityModel = require("../model/equityModel")

function readFile(){
    let myFile = fs.createReadStream('D:\\Royal Technosoft\\Mean\\PROJECT NIFTY\\seed\\NIFTY_50.csv','utf-8');

    myFile.pipe(new CsvReader())
    .on('data',function(row){
        console.log("Row--> ",row[3])
    }).on('end',function(){
        console.log('No More rows ')
    })
}


//uploadIndustry
module.exports.uploadIndustry = async function ()
{
    let industryArray = [] // It contain the data of CSV file
    let myDataFromDb = [] //It contain the data(Industry Name) of database

    IndustryModel.find().then(data=>{
        myDataFromDb = data
    })

    let myFile = fs.createReadStream('D:\\Royal Technosoft\\Mean\\PROJECT NIFTY\\seed\\NIFTY_50.csv','utf8')

    let promise = new Promise((resolve,reject)=>{

            myFile.pipe(new CsvReader())
            .on('data',function(row){
                if(industryArray.indexOf(row[3].toLowerCase()) == -1){
                    industryArray.push(row[3].toLowerCase()) //Only Unique IndustryName from CSV will be Push(insert) in industryArray
                }
            })
            .on('end',function(){
                let industryJson = []

                for(let i = 0;i<myDataFromDb.length;i++){
                    // if(myDataFromDb.indexOf(industryArray[i]!=-1))
                    // {
                    //     delete industryArray.indexOf(industryArray[i])
                    // }
                    if(industryArray.indexOf(myDataFromDb[i].IndustryName.toLowerCase() != -1))
                    {
                        delete industryArray[industryArray.indexOf(myDataFromDb[i].IndustryName)]
                    }
                }
                console.log(industryArray)
                console.log("Length - ",industryArray.length);
                industryArray.forEach(item=>industryJson.push({"IndustryName":item}))
                resolve(industryJson)
            })
    })
    let data = await promise
    return data;
}


//uploadEquity
module.exports.uploadEquity = async function()
{
    let eqArray = []
    let industryDb = [] //Contains all data of Industry database
    let equityDb = [] //Constains Company Name of Equity database
 
    IndustryModel.find().then(data=>{
        industryDb = data
    })
    await EquityModel.find({},{_id:0,CompanyName:1}).then(data=>{
        data.forEach(item=>equityDb.push(item.CompanyName))
        console.log("equityDB-- ",equityDb)
    })
    let myFile = fs.createReadStream('D:\\Royal Technosoft\\Mean\\PROJECT NIFTY\\seed\\NIFTY_50.csv','utf8')
    let promise = new Promise((resolve,reject)=>{
        myFile.pipe(new CsvReader())
        .on('data',function(row){
            let industryName = row[3] 
        for(let i = 0;i<industryDb.length;i++)
        {
            if(industryDb[i].IndustryName.toLowerCase() == industryName.toLowerCase() && equityDb.indexOf(row[0].toLowerCase()) == -1)
            {
            let eq = {CompanyName:row[0],Symbol:row[1],ISINCode:row[2],Price:row[4],YearHigh:row[5],YearLow:row[6],IndustryID:industryDb[i]._id}
            eqArray.push(eq)
            }
            }

        }).on('end',function(){
            resolve(eqArray)
            console.log("eqArray--> ",eqArray)
        })
    })
    let data = await promise    
    return data
} 