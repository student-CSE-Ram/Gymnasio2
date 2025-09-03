import React from 'react'

export default function HeroFeatures() {
    const features = [
        {
            title: "Comprehensive Dashboard",
            description: "Get a complete overview of your gym's performance, including member activity, trainer schedules, and financial reports."
        },
        {
            title: "Member Management",
            description: "Easily add, remove, and manage member profiles, track attendance, and monitor subscription statuses."
        },
        {
            title: "Trainer Coordination", 
            description: "Assign trainers to members, manage their schedules, and track their performance all in one place."
        },
        {
            title: "Workout & Diet Plans",
            description: "Create and customize workout and diet plans for members, and allow trainers to update them as needed."
        },
        {
            title: "Payment Processing",
            description: "Handle membership payments, track due dates, and generate financial reports with ease."
        },
        {
            title: "Progress Tracking",
            description: "Monitor member progress with detailed analytics and reports, helping trainers adjust plans for better results."
        },
      
        

    ];
  return (
    <div className='px-6 md:px-10 lg:px-20 py-16 bg-zink-200'>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-18 mb-10'>
            
            {features.map((feature,index) =>(
                <div key={index} data-aos = "fade-up" >
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed">{feature.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
