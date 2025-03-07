//　＜＜＜＜＜user.js日つよなかったので、あとで消すかもです＞＞＞＞＞＞＞

const router = require('express').Router();
const User = require('../models/UserSchema');

//CRUD for usernickname
//read user


//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) { //params.idはURLの :id の部分
        if (req.body.password) {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body, //$setを使用して、UserModelの全フィールドを更新
                });
                res.status(200).json("Account has been updated");
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("You can update only your account!");
        }
    }
});

module.exports = router;