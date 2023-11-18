const router = require('express').Router();
const User = require('../models/User');
const {verifyToken, verifyAndAuth} = require('./verifytoken');

//Route for getting a user
router.get('/:id', verifyAndAuth, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json({...others});
    }  
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
