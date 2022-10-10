const crypto = require('crypto');
const db = require("../models");
const Users = db.users;

exports.signup = async (req, res) => {
    if (!req.body.username || req.body.username == "" || !req.body.phoneNo || req.body.phoneNo == '' || !req.body.password || req.body.password == '' || !req.body.type || req.body.type == '') {
        res.send({ message: "Content can not be empty!", success: false });
        return;
    }

    // Create a User
    const user = new Users({
        username: req.body.username,
        phoneNo: req.body.phoneNo,
        type: req.body.type,
        password: getHashedPassword(req.body.password)
    });

    var exist = false;
    await Users.findOne({phoneNo: req.body.phoneNo}).then(data => {
        if(data) {
            exist = true;
        }
    }); 

    if(exist) return res.send({ message: 'This phon number already registered.', success: false });

    // Save User in the database
    await user.save(user).then(data => {
        console.log(user);
        res.send({ success: true, user: user });
    }).catch(err => {
        res.status(500).send({ message: err.message, success: false });
    });

}

exports.signin = async (req, res) => {
    const { phoneNo, password } = req.body;
    if (!phoneNo || phoneNo == '' || !password || password == '') {
        res.send({ message: "Content can not be empty!", success: false });
        return;
    }

    const hashedPassword = getHashedPassword(password);
    await Users.findOne({phoneNo: req.body.phoneNo}).then(data => {
        if(data) {
            if(data.password == hashedPassword) return res.send({ status: true, user: data });
            else return res.send({ status: false, message: "Invalid Password. Try again!" });
        } else {
            return res.send({ status: false, message: "This Phone is not Registerd!" });
        }
    }).catch(error => {
        res.send({ status: false, message: "Something was happened Error!" })
    })


}

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}