"use client"

import React from 'react'
import { motion } from 'framer-motion'

const JumbotronPage = () => {
  return (
      <section className="bg-gray-900 pt-16" id='beranda'>
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col justify-center">
                  <motion.h1 initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 2 }}
                      transition={{ duration: 2 }} className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Sistem Monitoring Sampah Berbasis IoT & Machine Learning Kota Batam</motion.h1>
                  <motion.p initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 2 }}
                      transition={{ duration: 2 }} className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Pantau Sampah memanfaatkan machine learning untuk menganalisis dan mengoptimalkan pengelolaan limbah, membantu menciptakan lingkungan yang lebih bersih.</motion.p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
                      <motion.a initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 2 }}
                          transition={{ duration: 2 }} href="#pantauSampah" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                          Pantau Sampah
                          <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                          </svg>
                      </motion.a>
                      <motion.a initial={{ x: -100, opacity: 0 }}
                          animate={{ x: 0, opacity: 2 }}
                          transition={{ duration: 2 }} href="#tentang" className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center">
                          Tentang
                      </motion.a>
                  </div>
              </div>
              <div>
                  <motion.img
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1 }}
                      src="/sampah.jpg"
                      alt="sampah"
                      width={500}
                      height={300}
                      className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl object-cover"
                  />
              </div>
          </div>
      </section>
  )
}

export default JumbotronPage


// developed by Natagw, natagw.my.id