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
          model: User,
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
    },
    totalUnits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    availableUnits: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
},{
    tableName: "properties",
    timestamps: true,
});

Property.associate = (models) => {
  Property.belongsTo(models.User, {
    foreignKey: "owner",
    as: "Host",
  });

  Property.hasMany(models.Booking, {
    foreignKey: "propertyId",
    as: "bookings",
    onDelete: "CASCADE",
  });
};

export default Property;