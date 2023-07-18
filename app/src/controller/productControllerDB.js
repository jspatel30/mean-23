const ProductModel = require("../model/productModel")

//addProduct
module.exports.addProduct = function addProduct(req,res)
{
    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    let categoryId = req.body.categoryId
    
    let product = new ProductModel(
        {
            "productName":productName,
            "price":price,
            "qty":qty,
            "categoryId":categoryId
        })
    product.save()
    res.json({"msg":"Product Added","data":product,"rescode":"200"})
}

//getAllProduct
module.exports.getAllProducts = function getAllProducts(req,res)
{
    // ProductModel.find().then((data)=>{
        ProductModel.find().populate("categoryId").exec().then((data)=>{    
            res.json({"msg":"Product Retrieved","data":data,"rescode":"200"})
        }).catch((err)=>{
            res.json({"msg":"Something went wrong in fetching data","err":err,"rescode":-9})
        })
}

//getProductById
module.exports.getProductById = function getProductByID(req,res)
{
    let productId = req.params.productId

    ProductModel.findById({_id:productId}).then((data)=>{
        if(data === null)
        {
            res.json({"msg":"Product ID not Found","err":data,"rescode":-9})    
        }
        else
        {
            res.json({"msg":"Product Found","data":data,"rescode":200})
        }
    }).catch((err)=>{
        res.json({"msg":"Something Went Wrong","err":err,"rescode":-9})
    })

}

//deleteProductById
module.exports.deleteProductById = function getProductByID(req,res)
{
    let productId = req.params.productId
    ProductModel.findByIdAndDelete({_id:productId}).then((data)=>{
        if(data === null)
        {
            res.json({"msg":"Product ID not Found","err":data,"rescode":-9})    
        }
        else
        {
            res.json({"msg":"Product deleted Successfully","data":data,"rescode":200})
        }
        }).catch((err)=>{
        res.json({"msg":"Something Went Wrong","err":err,"rescode":-9})
    })
}

//deleteAllProduct
module.exports.deleteAllProduct = function deleteAllProduct(req,res)
{
    ProductModel.deleteMany({}).then((data)=>{
            res.json({"msg":"Product deleted Successfully","data":data,"rescode":-9})    
    }).catch((err)=>{
        res.json({"msg":"Product not deleted","err":err,"rescode":-9})
    })   
}


//filterProduct
module.exports.filterProduct = function(req,res)
{
    let minPrice = req.body.minPrice
    let maxPrice = req.body.maxPrice
    ProductModel.find({
        $and:[{
            price:{
                $gt:minPrice
            }
        },
        {
            price:{
                $lt:maxPrice
            }
        },
        {
            productName:{
             $in:   ["Small Wooden Computer"]
             
            }
        }

    ]
    }).then((data)=>{
        if(data.length == 0)
        {
            res.json({"msg":"Product Not found","data":req.body,"rescode":"-9"})
        }
        else
        {
            res.json({"msg":"Product Filter","data":data,"rescode":"200"})

        }
    }).catch((err)=>{
        res.json({"msg":"Something went wrong","data":err,"rescode":"-9"})
    })
}


//updateProduct
module.exports.updateProduct = function updateProduct(req,res)
{
    let productId = req.body.productId
    let price = req.body.price
    let qty = req.body.qty
//updateOne({name:"jay"},{$set :{password:"54321"} })
//    ProductModel.updateOne({productName:productName},{$set :{price:price}})
    ProductModel.updateOne({_id:productId},{"price":price,"qty":qty}).then((data)=>{
        res.json({"msg":"Data Updated","data":data,"rescode":200})
    }).catch((err)=>{
        res.json({"msg":"Data Updation Fails","err":err,"rescode":-9})
    })
}