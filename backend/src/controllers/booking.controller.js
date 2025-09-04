import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import User from "../Models/user.model.sql.js";
import models from "../Models/index.js";
import { Op } from "sequelize";


const { Booking, Property, User } = models;

// Booking
export const createBooking = asyncHandler(async (req, res) => {
    const { propertyId, checkIn, checkOut, Guests} = req.body;
    const userId = req.user.id;
    
    const property = await Property.findByPk(propertyId);
    if (!property) throw new ApiError(404, "Property not found");
    
    const overlappingBooking = await Booking.findAll({
        where: {
        propertyId,
        BookingStatus: "confirmed",
        [Op.or]: [
                {checkIn: {[Op.between]: [checkIn, checkOut]}},
                {checkOut: {[Op.between]: [checkIn, checkOut]}},
                {
                    [Op.and]: [
                        {checkIn: {[Op.lte]: checkIn}},
                        {checkOut: {[Op.gte]: checkOut}},
                    ],
                },
            ],
        },
    });

    let alreadyBooked = 0;
    overlappingBooking.forEach(element => {
        alreadyBooked += element.Guests;
    });

    if (alreadyBooked + Guests > property.MaxGuests) {
        throw new ApiError(400, "The property is already booked for the selected dates");
    }

    property.availableUnits -= Guests;
    await property.save();
    
    const booking = await Booking.create({
        userId,
        propertyId,
        checkIn,
        checkOut,
        Guests,
        TotalPrice: property.price * Guests,
        BookingStatus: "confirmed",
    });

    return res.status(200).json(new ApiResponse(200, booking, "Booking created successfully"));
})

// restore the availability(just for checking)
export const restoreAvailability = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if(!booking) throw new ApiError(404, "Booking not found");

    const property = await Property.findByPk(booking.propertyId);
    if(!property) throw new ApiError(404, "Property not found");

    property.availableUnits += booking.Guests;

    booking.status = "Completed";
    await property.save();
});

// get user Booking
export const getUserBookings = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
    if(!userId) throw new ApiError(400, "UnAuthorized");

    const booking = await Booking.findAll({
        where:{
            userId
        },
        include:{
            model: Property,
            as: "property",
            attributes: ["id", "title", "location", "price"]
        },
        order: [['checkIn', 'DESC']]
    })

    if(!booking || booking.length === 0) throw new ApiError(404, "No Bookings found");

    return res.status(200).json(new ApiResponse(200, booking, "User bookings get successfully"));
    } catch (error) {
        console.error("Sequelize Error:", error);
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
})

// cancel user booking
export const cancelUserBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);
    if(!booking) throw new ApiError(404, "Booking not found");

    const property = await Property.findByPk(booking.propertyId);
    if(!property) throw new ApiError(404, "Property not found");

    property.availableUnits += booking.Guests;

    await property.save();

    booking.status = "canceled";
    await booking.save();

    return res.status(200).json(new ApiResponse(200, null, "Booking canceled successfully"));
});


// get all booking for admin
export const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        attributes: ["id", "checkIn", "checkOut", "Guests", "TotalPrice", "BookingStatus"],
        include: [
            {
                model: Property,
                as: "property",
                attributes: ["id", "title", "location", "price"]
            },
            {
                model: User,
                as: "user",
                attributes: ["id", "fullName", "email"]
            }
        ],
        order: [['checkIn', 'DESC']]
    });

    if(!bookings || bookings.length === 0) throw new ApiError(404, "No Bookings found");

    const formattedBooking = bookings.map((b) =>{
        const booking = b.toJSON();
        booking.TotalPrice = booking.Guests * booking.property.price;
        return booking;
    })

    return res.status(200).json(new ApiResponse(200, formattedBooking, "All bookings get successfully"));

});