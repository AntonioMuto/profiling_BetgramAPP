const getDb = require('../config/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;

const getUserById = async (userId) => {
    try {
        const db = await getDb();
        var query = { _id: new ObjectId(userId) };
        const queryCursor = db.collection("users").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `USER ID '${userId}' not found`
            };
        }
        return queryResult[0];
    } catch (error) {
        throw new Error(error);
    }
};


const saveNewUser = async (user) => {
    try {
        const db = await getDb();
        const saltRoundsNumber = Number(saltRounds) || 10;
        const hashedPassword = bcrypt.hash(user.password, saltRoundsNumber);
        user.password = hashedPassword;
        const queryCursor = db.collection("users").insertOne(user);
        const queryResult = await queryCursor;
        return queryResult;
    } catch (error) {
        throw new Error(error);
    }
};

const loginUser = async (user) => {
    try {
        const db = await getDb();
        var query = { username: user.username, email: user.email };
        const queryCursor = db.collection("users").find(query);
        const queryResult = await queryCursor.toArray();
        if (queryResult.length === 0) {
            return {
                status: "error",
                error: `USER '${user.username}' and EMAIL '${user.email}' not found`
            };
        }
        const userDb = queryResult[0];
        const isMatch = await bcrypt.compare(user.password,userDb.password);
        if (!isMatch) {
            return {
                status: "error",
                error: `PASSWORD is not correct`,
            };
        }
        userDb.password = null;
        return userDb;
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    saveNewUser,
    loginUser
};