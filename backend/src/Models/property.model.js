import { DataTypes } from "sequelize";
import sequelize from "../db/db.sql.js";
import User from "./user.model.sql.js";

const Property = sequelize.define("Property", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avgRating: { 
        type: DataTypes.FLOAT, 
        defaultValue: 0 
    },
    reviewCount: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0 
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lng: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    tableName: "properties",
    timestamps: true,
});

Property.belongsTo(User, { foreignKey: 'owner', as: 'Host' });

export default Property;