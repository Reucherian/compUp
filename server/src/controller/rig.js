import Rig from '../models/rig.js'

/**
 * Retrieves all rigs
 * @param {*} req 
 * @param {*} res 
 */
 export async function getRigs(req,res){
    try{
        console.log("getRigs");
        const rig = await Rig.find();
        res.status(200).json(rig);
    }
    catch(err){
        res.status(500).json({message: "Internal Server Error"});
    }
}

/**
 * Retrieves an rig given its id as the request parameter.
 * @param {*} req 
 * @param {*} res 
 */
export async function getRig(req,res){
    try{
        console.log("getRig");
        const { id } = req.params;
        const rig = await Rig.findById(id);
        res.status(200).json(rig);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid rig id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

/**
 * Creates a new rig given the parameters in request body
 * @param {*} req 
 * @param {*} res 
 */
export async function addRig(req,res){
    const { rigName, category, creator } = req.body;
    const rig = new Rig({
        rigName: rigName,
        category: category || "not defined",
        creator: creator,
        upVotes: [],
        downVotes: [],
        parts: []
    });
    try{
        console.log("addRig");
        const response = await rig.save();
        res.status(201).json(response);
    }catch(err){
        res.json({message: 'Error '+err});
    }
}

/**
 * Removes an rig rig using its id
 * @param {*} req 
 * @param {*} res 
 */
export async function removeRig(req,res){
    try{
        console.log("removeRig");
        const { id } = req.params;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await rig.delete();
        res.json(response);
    }
    catch(err){
        if (err.name === 'CastError'){
            res.status(400).json({message: 'The provided string is not a valid rig id'});
        }
        else{
            res.json({message: 'Error '+ err});
        }
    }
}

/**
 * A particular user up voting a rig
 * @param {*} req 
 * @param {*} res 
 */
export async function upVote(req,res){
    try{
        console.log("upVote");
        const { id, userId } = req.params;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await Rig.findByIdAndUpdate(id, {
            $addToSet: { upVotes: userId },
            $pull: { downVotes: userId }
        })
        res.json(response);
    }
    catch(err){
        res.json({message: 'Error '+err});
    }
}

/**
 * A particular user down voting a rig
 * @param {*} req 
 * @param {*} res 
 */
export async function downVote(req,res){
    try{
        console.log("downVote");
        const { id, userId } = req.params;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await Rig.findByIdAndUpdate(id, {
            $addToSet: { downVotes: userId },
            $pull: { upVotes: userId }
        });
        res.json(response);
    }
    catch(err){
        res.json({message: 'Error '+err});
    }
}

/**
 * Checking if a particular user has up voted a rig.
 */
export async function isUpVote(req,res){
    try{
        console.log("isUpVote")
        const { id, userId } = req.params;
        console.log(id, userId);
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await Rig.count({
            _id: id,
            upVotes: { $in : [userId] }
        });
        res.json(Boolean(response));
    }
    catch(err){
        res.json({message: 'Error '+err})
    }
}

/**
 * Checking if a particular user has down voted a rig
 * @param {*} req 
 * @param {*} res 
 */
export async function isDownVote(req,res){
    try{
        console.log("isDownVote");
        const { id, userId } = req.params;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await Rig.count({
            _id: id,
            downVotes: { $in : [userId] }
        });
        res.json(Boolean(response));
    }
    catch(err){
        res.json({message: 'Error '+err})
    }
}
/**
 * adding an item to a custom rig.
 * @param {*} req 
 * @param {*} res 
 */
export async function addItem(req,res){
    try{
        console.log("addItem");
        const { id } = req.params;
        const item = req.body;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        const response = await Rig.findByIdAndUpdate(id, {
            $push: { parts : item }
        })
        res.json(response)
    }
    catch(err){
        res.json({message: 'Error '+err})
    }
}

/**
 * Send an amazon link with a cart populated for the list of things in a rig with a given id
 * @param {*} req 
 * @param {*} res 
 */
export async function buyRig(req,res){
    try{
        console.log("buyRig");
        const {id} = req.params;
        const rig = await Rig.findById(id);
        if(rig == null){
            throw('The rig with the requested id does not exist');
        }
        console.log(rig.parts);
        const url = "https://www.amazon.com/gp/aws/cart/add.html?" + rig.parts.map((item,index) => {
            return `ASIN.${index+1}=${item["asinUri"]}&Quantity.${index+1}=1`
        }).join('&');
        console.log( rig.parts.map((item,index) => {
            return `ASIN.${index+1}=${item["asinUri"]}&Quantity.${index+1}=1`
        }).join('&'));
        res.json({"href":url});
    }catch(err){
        res.json({message: 'Error'+err})
    }
}