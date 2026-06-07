const mongoose = require("mongoose");

const memberAttendanceSchema = new mongoose.Schema(
{
    memberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    membershipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Membership",
        required: true
    },

    checkInTime: {
        type: Date,
        default: Date.now
    },

    checkOutTime: {
        type: Date,
        default: null
    },

    attendanceDate: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setHours(0,0,0,0);
            return date;
        }
    }
},
{
    timestamps: true
}
);

memberAttendanceSchema.index({
    memberId: 1,
    attendanceDate: 1
});

module.exports = mongoose.model(
    "MemberAttendance",
    memberAttendanceSchema
);