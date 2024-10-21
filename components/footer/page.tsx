/* eslint-disable @next/next/no-img-element */
import React from 'react'

const Footer = () => {
  return (
      <footer className="mt-8 rounded-lg shadow">
          <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
              <div className="sm:flex sm:items-center sm:justify-between">
                  <a href="#beranda" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                      <img src="/gw.png" className="h-8" alt="Flowbite Logo" />
                      <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pantau Sampah</span>
                  </a>
                  <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                      <li>
                          <a href="#beranda" className="hover:underline me-4 md:me-6">Beranda</a>
                      </li>
                      <li>
                          <a href="#tentang" className="hover:underline me-4 md:me-6">Tentang</a>
                      </li>
                      <li>
                          <a href="#pantauSampah" className="hover:underline me-4 md:me-6">Pantau Sampah</a>
                      </li>
                      {/* <li>
                          <a href="#perangkatIoT" className="hover:underline">Perangkat IoT</a>
                      </li> */}
                  </ul>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Pantau Sampah Iteba. All Rights Reserved.</span>
          </div>
      </footer>
  )
}

export default Footer


// developed by Natagw, natagw.my.id