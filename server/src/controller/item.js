import Item from '../models/item.js'

/**
 * Retrieves all items
 * @param {*} req 
 * @param {*} res 
 */
export async function getItems(req,res){
    try{
        console.log("getItems");
        const item = await Item.find();
        res.status(200).json(item);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves an item given its id as the request parameter.
 * @param {*} req 
 * @param {*} res 
 */
export async function getItem(req,res){
    try{
        console.log("getItem");
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200).json(item);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid item id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

/**
 * Creates a new item given the parameters in request body
 * @param {*} req 
 * @param {*} res 
 */
export async function addItem(req,res){
    console.log(req.body);
    const {itemName, category, asinUri, price, pictureUri} = req.body;
    const item = new Item({
        itemName: itemName,
        category: category || "not defined",
        asinUri: asinUri,
        price: price,
        // Over here you can replace null with another default picture uri
        pictureUri: pictureUri || null
    });
    try{
        console.log("addItem");
        const response = await item.save();
        res.status(201).json(response);
    }catch(err){
        res.json({message: 'Error '+err});
    }
}

/**
 * Removes an item item using its id
 * @param {*} req 
 * @param {*} res 
 */
export async function removeItem(req,res){
    try{
        console.log("Removing a item");
        const { id } = req.params;
        const item = await Item.findById(id);
        console.log(item);
        if(item == null){
            throw('Item does not exist')
        }
        const response = await item.delete();
        res.json(response);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid item id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}
/**
 * Creates an amazon purchase link for the particular item
 * @param {*} req 
 * @param {*} res 
 */
export async function buyItem(req,res){
    try{
        console.log("buyItem");
        const {id} = req.params;
        const item = await Item.findById(id);
        if(item == null){
            throw('The item with the requested id does not exist');
        }
        const url = "https://www.amazon.com/gp/aws/cart/add.html?"+`ASIN.1=${item["asinUri"]}&Quantity.1=1`;
        res.json({"href":url});
    }catch(err){
        res.json({message: 'Error'+err})
    }
}