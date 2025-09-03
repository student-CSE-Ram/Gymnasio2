import React from 'react'
import blog1 from '/blog1.png'
import blog2 from '/blog2.png'
import blog3 from '/blog3.png'
import blog4 from '/blog4.png'
import blog5 from '/blog5.png'
import blog6 from '/blog6.png'

export default function BlogMain() {
    const blogs = [
        {
            title: "The Ultimate Guide to Building a Home Gym",
            excerpt: "Discover how to create a functional and motivating home gym with essential equipment and design tips.",
            imageUrl: blog1},
        {
            title: "10 Proven Strategies to Stay Motivated in Your Fitness Journey",
            excerpt: "Learn effective techniques to keep your fitness goals on track and maintain long-term motivation.",
            imageUrl: blog2},
        {
            title: "Nutrition Myths Debunked: What You Really Need to Know",
            excerpt: "Get the facts on common nutrition myths and learn how to fuel your body for optimal performance.",
            imageUrl: blog3},
        {

            title: "The Benefits of Strength Training for All Ages",
            excerpt: "Explore the numerous benefits of strength training and how it can improve health and fitness at any age.",
            imageUrl: blog4
        },
        {
            title: "Yoga for Beginners: A Step-by-Step Guide",
            excerpt: "Start your yoga journey with this comprehensive guide designed for beginners.",
            imageUrl:blog5
        },
        {

            title: "HIIT Workouts: Maximize Your Results in Less Time",
            excerpt: "Learn how High-Intensity Interval Training (HIIT) can help you burn fat and build muscle efficiently.",
            imageUrl: blog6
        }
    ];
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 my-20 gap-8 px-10' >
        {blogs.map((blog,i) =>(
            <div key={i} className='bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out' data-aos="fade-up">
                <img src={blog.imageUrl} alt={blog.title} className='w-full h-48 object-cover'/>
                <h2 className='text-xl font-bold text-gray-800 p-4'>{blog.title}</h2>
                <p className='text-gray-600 p-4 pt-0'>{blog.excerpt}</p>
            </div>
        ))}
    </div>
  )
}
