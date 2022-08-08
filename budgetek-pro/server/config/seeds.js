const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {});