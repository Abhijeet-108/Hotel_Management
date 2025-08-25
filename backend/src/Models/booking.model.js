import { DataTypes } from "sequelize";
import sequelize from "../db/db.sql";
import { v4 as uuidv4 } from "uuid";

const Booking = sequelize.define("Booking",{
    id:{
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
    checkIn:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOut:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    Guests:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    TotalPrice:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    BookingStatus:{
        type: DataTypes.ENUM("pending", "confirmed", "canceled"),
        allowNull: false,
        defaultValue: "pending"
    }
})

Booking.associate = (model)=>{
    Booking.belongsTo(model.User, { foreignKey: "userId", as: "user" });
    Booking.belongsTo(model.Property, { foreignKey: "propertyId", as: "property" });
}

export default Booking;