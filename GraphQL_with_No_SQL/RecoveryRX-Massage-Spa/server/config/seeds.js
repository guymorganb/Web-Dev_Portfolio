import Service from '../models/services.js';
import mongoose from "mongoose";
import User from '../models/user.js';
import Appointment from '../models/appointments.js';
import SeedStatus from '../models/seedStatus.js';

const seedDatabase = async () => {
    const seedCheck = await SeedStatus.findOne();
    if (!seedCheck) {
        try{
            await Service.deleteMany({});
            await User.deleteMany({});  // Clear existing users
        await Appointment.deleteMany({});
        await Appointment.insertMany([
          {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            phone: '303-123-4567',
            date: '9/27/23',
            massage: 'Oil Massage',
            cupping: false,
            contactMethod: 'email',
            timeWindow: '9:00a - 10:00a',
          },
          {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@gmail.com',
            phone: '303-246-1357',
            date: '9/30/23',
            massage: 'Stone Massage',
            cupping: true,
            contactMethod: 'text',
            timeWindow: '9:00a - 10:00a',
          },
          {
            firstName: 'Jack',
            lastName: 'Doe',
            email: 'jack.doe@gmail.com',
            phone: '303-234-1547',
            date: '10/15/23',
            massage: 'Hand Massage',
            cupping: false,
            contactMethod: 'call',
            confirm: true, 
            timeWindow: '9:00a - 10:00a',
          },
          {
            firstName: 'Jill',
            lastName: 'Doe',
            email: 'jill.doe@gmail.com',
            phone: '303-210-5924',
            date: '10/7/23',
            massage: 'Foot Massage',
            cupping: false,
            contactMethod: 'email',
            rejected: true, 
            timeWindow: '9:00a - 10:00a',
          },
        ])
        await Service.insertMany([
            {
                title: "Swedish Massage",
                description: "Swedish massage is a type of massage that uses long, flowing strokes to promote relaxation and relieve tension. It is a gentle massage that is suitable for people of all ages and fitness levels. Swedish massage can help to improve circulation, reduce stress, and relieve pain. It can also help to improve sleep and boost energy levels.",
                price: [{ min60: '$80', min90: '$140' }],
                image: "https://i.imgur.com/MziQVYD.jpg"
            },
            {
                title: "Sports Massage",
                description: "Sports massage is a type of massage that is specifically designed to help athletes recover from workouts and injuries. It is a more vigorous massage than Swedish massage, and it uses a variety of techniques to target the muscles and soft tissues that are used in sports. Sports massage can help to improve circulation, reduce muscle soreness, and increase flexibility. It can also help to prevent injuries and improve performance.",
                price: [{ min60: '$80', min90: '$140' }],
                image: "https://i.imgur.com/2eixG1K.jpg",
            },
            {
                title: "Deep Tissue",
                description: "Deep tissue massage is a type of massage that uses deep pressure to target the muscles and connective tissue. It is a more intense massage than Swedish massage or sports massage, and it is typically used to treat chronic pain, muscle tightness, and other conditions. Deep tissue massage can be beneficial for a variety of reasons. It can help to improve circulation, reduce muscle soreness, and increase flexibility. It can also help to relieve pain, improve sleep, and boost energy levels.",
                price: [{ min60: '$80', min90: '$140' }],
                image: "https://i.imgur.com/MKWcxw9.jpg",
            },
            {
                title: "Cupping",
                description: "Cupping is a type of massage that uses suction to create a vacuum on the skin. This can help to improve circulation, reduce inflammation, and relieve pain. Cupping is typically used to treat chronic pain, muscle tightness, and other conditions. Cupping is performed by placing a cup on the skin and then creating a vacuum by either suctioning air out of the cup or using a heat source to create steam. The suction pulls the skin up into the cup, which creates a stretch on the muscles and tissues. This can help to improve circulation, reduce inflammation, and relieve pain.",
                price: [{ min60: '$80', min90: '$140' }],
                image: "https://i.imgur.com/HdUwuBJ.jpg",
            },
            {
                title: "Hot Stones",
                description: "Hot stone massage is a type of massage that uses heated stones to promote relaxation and relieve pain. The stones are typically made of basalt, which is a type of volcanic rock that retains heat well, the stones are typically placed on the back, shoulders, neck, and legs. Hot stone massage can be beneficial for a variety of reasons. It can help to improve circulation, reduce muscle soreness, and relieve pain. It can also help to promote relaxation and reduce stress.",
                price: [{ min60: '$80', min90: '$140' }],
                image: "https://i.imgur.com/lqzR9LJ.jpg",
            }
        ])
            // Seed a user
            const user = new User({
                username: 'admin',
                email: 'admin@example.com',
                password: 'password123',
            });
            await user.save();  
            console.log('Seeding completed!');

            const seedStatus = new SeedStatus({ seeded: true });
            await seedStatus.save();
        } catch (error) {
            console.error('Error during seeding:', error);
        }
    }
}
export default seedDatabase;