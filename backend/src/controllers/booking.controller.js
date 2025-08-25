import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import Property from "../Models/property.model";
import Booking from "../Models/booking.model";
import { Op } from "sequelize";


// Booking
export const createBooking = asyncHandler(async (req, res) => {
    const { propertyId, checkIn, checkOut, Guests} = req.body;
    const userId = req.user.id;
    
    const property = await Property.findByPk(propertyId);
    if (!property) throw new ApiError(404, "Property not found");
    
    const overlappingBooking = await Booking.findOne({
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

    const alreadyBooked = overlappingBooking.reduce(
        (sum, b) => sum + b.Guests, 0
    );

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

    await property.save();
});

// get user Booking
export const getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    if(!userId) throw new ApiError(400, "UnAuthorized");

    const booking = await Booking.findAll({
        where:{
            userId
        },
        include:{
            model: Property,
            attributes: ["id", "name", "location", "price"]
        },
        order: [['checkIn', 'DESC']]
    })

    if(!booking || booking.length === 0) throw new ApiError(404, "No Bookings found");

    return res.status(200).json(new ApiResponse(200, booking, "User bookings get successfully"));
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
    return res.status(200).json(new ApiResponse(200, null, "Booking canceled successfully"));
});


// get all booking for admin
export const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        include: [
            {
                model: Property,
                attributes: ["id", "name", "location", "price"]
            },
            {
                model: User, 
                attributes: ["id", "name", "email"]
            }
        ],
        order: [['checkIn', 'DESC']]
    });

    if(!bookings || bookings.length === 0) throw new ApiError(404, "No Bookings found");

    return res.status(200).json(new ApiResponse(200, bookings, "All bookings get successfully"));

});
