require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save()
        res.status(201).json({ message: 'Utilisateur créé !' })
    } catch (error) {

        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: 'Identifiant ou mot de passe incorrecte !' });

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(401).json({ message: 'Identifiant ou mot de passe incorrecte !' });

        await res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                process.env.RANDOM_TOKEN_SECRET,
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ error });
        console.log(error);
    }
};