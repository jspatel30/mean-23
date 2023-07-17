const CategoryModel = require("../Model/categoryModel")

//addCategory
module.exports.addCategory = function(req,res){
    
    let category = new CategoryModel({
        "categoryName":req.body.categoryName
    })
    category.save().then((data)=>{

        res.json({"msg":"Category added","data":category,"rescode":"200"})
    }).catch((err)=>{
        res.json({"msg":"Something weent wrong","data":err,"rescode":"-9"})

    })
}


//getAllCategory
module.exports.getAllCategory = function(req,res){
    CategoryModel.find().then((data)=>{
        if(data == null)
        {
            res.json({"msg":"No Category Found","rescode":200})
        }
        else
        {
            res.json({"msg":"All Category Retrieved","data":data,"rescode":200})
        }
    })
}


//getCategoryById
module.exports.getCategoryById = function(req,res){
    let categoryId = req.params.categoryId
    CategoryModel.findById({_id:categoryId}).then((data)=>
    {
        if(data == null)
        {
            res.json({"msg":"No category found","data":data,"rescode":-9})
        }   
        else
        {
            res.json({"msg":"Categroy Found","data":data,"rescode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something went Wrong","err":err,"rescode":-9})
    })
}




//deleteAllCategory
module.exports.deleteAllCategory = function(req,res){
    CategoryModel.deleteMany({}).then((data)=>{
        res.json({"msg":"All Category Deleted","data":data,"rescode":200})
    }).catch((err)=>{
        res.json({"msg":"Something went wrong","err":err,"rescode":-9})
    })
}




//delteCategoryById
module.exports.deleteCategoryById = function delteCategoryById(req,res)
{
    let categoryId = req.params.categoryId
    CategoryModel.findByIdAndDelete({_id:categoryId}).then((data)=>
    {
        if(data == null)
        {
            res.json({"msg":"Category Not found","data":data,"rescode":-9})
        }
        else
        {
            res.json({"msg":"Category Deleted","data":data,"rescode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something went wrong","err":err,"rescode":"200"})
    })

}
