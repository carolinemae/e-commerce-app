const Category = require('./Category');
const Product = require('./Product');
const ProductTag = require('./ProductTag');
const Tag = require('./Tag');

Product.belongsTo(Category, {
    foreignKey: 'category_id'
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
});

Product.belongsToMany(Tag, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: 'tags'
});

Tag.belongsToMany(Product, {
    through: {
        model: ProductTag,
        unique: false
    },
    as: 'products'
});

module.exports = { Product, Category, Tag, ProductTag };