const userService = require('../services/userService');

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const userId = req.body;
        const user = await userService.loginUser(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
};

exports.signInUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const user = await userService.saveNewUser(newUser);
        res.json(user);
    } catch (error) {
        next(error);
    }
};
