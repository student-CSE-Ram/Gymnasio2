// const mongoose = require('mongoose');

// require('dotenv').config();

// const User = require('../models/User');

// const seedOwner = async () =>{
//     try {

//         const existingOwner = await User.findOne({role: "owner"});

//         if (existingOwner) {
//             console.log("Owner already exists ",existingOwner.email);
//             process.exit(0);
//         }
//         const hashedPassword = await bcrypt.hash('DonaldMusk89@',10)
//         const owner = new User({
//             name: "Nitesh",
//             email: "muskd89@gmail.com",
//             password: hashedPassword,
//             role: "owner"
//         })

//         await owner.save();
//         console.log("Owner created", owner.email);
//         process.exit(0);
//     } catch (error) {
//         console.log("Error creating owner" ,error.message);
//         process.exit(1)
//     }
// }

// seedOwner();