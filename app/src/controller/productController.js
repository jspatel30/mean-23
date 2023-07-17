//add product
var products = []
function addProduct(req,res)
{
    let productName = req.body.productName
    let price = req.body.price
    let qty = req.body.qty
    let productId = parseInt(Math.random()*100)
    
    let product = {
        "productId":productId,
        "productName":productName,
        "price":price,
        "qty":qty
    }

    products.push(product)
     

    res.json({"msg":"Product Added","data":product,"rescode":200})
}

//getAllProducts
function getAllProducts(req,res)
{
    res.json({"msg":"Product Retrieved","data":products,"rescode":200})
}

//deleteProductById
function deleteProductById(req,res)
{
    var tempProducts = []
    let productId = req.params.productId

    // for(i = 0;i<products.length;i++)
    // {
    //     if(products[i].productId != productId)
    //     {
    //         tempProducts.push(products[i])
    //     }
    // }
    let oldLength = products.length()
    products = products.filter(p=>p.productId != productId)
    let newLength = products.length()
    if(oldLength!=newLength)
    {
        res.json({"msg":"Product Deleted","data":productId,rescode:200})
    }
    else
    {
        res.json({"msg":"SMW","data":productId,rescode:-9})
    }
    
}


module.exports.addProduct = addProduct
module.exports.getAllProducts = getAllProducts
module.exports.deleteProductById = deleteProductById