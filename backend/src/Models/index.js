import User from "./user.model.sql.js";
import Booking from "./booking.model.js";
import Property from "./property.model.js";

const models = {
  User,
  Booking,
  Property,
};

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

export { User, Property, Booking };
export default models;
