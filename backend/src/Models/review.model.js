import { DataTypes } from "sequelize";
import sequelize from "../db/db.sql.js";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model.sql.js";
import Property from "./property.model.js";
import { incrementPropertyRating, updatePropertyRating, deletePropertyRating } from "../services/review.service.js";

const Review = sequelize.define("Review",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    userId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
},{
    tableName: 'review',
    indexes: [
      { unique: true, fields: ['userId', 'propertyId'] },
      { fields: ['propertyId'] },
    ],
});

Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Review.belongsTo(models.Property, { foreignKey: "propertyId", as: "property" });
};

export default Review;