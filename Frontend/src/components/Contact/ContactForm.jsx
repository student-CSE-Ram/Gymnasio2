import React from 'react'

export default function ContactForm() {
  return (
    <div className='max-w-3xl mx-auto my-30 mt-30 p-8 rounded-lg bg-gradient-to-br from-amber-100 via-white to-amber-300'>
        <h2 className='text-3xl font-bold mb-6 text-left'>Get in touch</h2>
        <p className='text-gray-600 font-sm mb-10'>Please fill out the following information and we'll be in touch with you shortly to schedule a free demo presentation.

</p>
        <form className='space-y-6'>
            <div>
                <label className='block text-sm font-medium mb-2' htmlFor='name'>Name</label>
                <input className='mr-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500' type='text' id='name' name='name' placeholder='Your Name' required />
                <input className='ml-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 mt-4' type='number' id='number' name='number' placeholder='Mobile' required />
            </div>
            <div>
                <label className='block text-sm font-medium mb-2' htmlFor='email'>Email</label>
                <input className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500' type='email' id='email' name='email' />
            </div>
            <div>
                <label className='block text-sm font-medium mb-2' htmlFor='message'>Message</label>
                <textarea className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500' id='message' name='message' rows='5' placeholder='Your Message' required></textarea>
            </div>
            <div className='text-center'>
                <button className='bg-amber-500 text-white px-6 py-3 rounded-md hover:bg-amber-600 transition duration-300' type='submit'>Send Message</button>
            </div>
        </form>

    </div>
  )
}
