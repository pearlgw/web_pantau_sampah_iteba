"use client"

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const NavbarPage = () => {
    const [showBorder, setShowBorder] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowBorder(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
  return (
      <nav className={`fixed top-0 left-0 w-full z-50 bg-gray-900 ${showBorder ? 'border-b border-white' : ''}`}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                  <motion.img initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 2 }}
                      transition={{ duration: 3 }} src="/gw.png" className="h-8" alt="Pantau Sampah" />
                  <motion.span initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 2 }} className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pantau Sampah</motion.span>
              </a>
              <button
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false"
              >
                  <span className="sr-only">Open main menu</span>
                  <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 17 14"
                  >
                      <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h15M1 7h15M1 13h15"
                      />
                  </svg>
              </button>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-900 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900">
                      <li>
                          <motion.a initial={{ y: -100, opacity: 0 }} 
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5 }} href="#beranda" className="block py-2 px-3 text-white rounded md:p-0 hover:bg-gray-700 md:hover:bg-transparent hover:underline">
                              Beranda
                          </motion.a>
                      </li>
                      <li>
                          <motion.a initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1 }} href="#tentang" className="block py-2 px-3 text-white rounded md:p-0 hover:bg-gray-700 md:hover:bg-transparent hover:underline">
                              Tentang
                          </motion.a>
                      </li>
                      <li>
                          <motion.a initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 1.5 }} href="#pantauSampah" className="block py-2 px-3 text-white rounded md:p-0 hover:bg-gray-700 md:hover:bg-transparent hover:underline">
                              Pantau Sampah
                          </motion.a>
                      </li>
                      <li>
                          <motion.a initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 2 }} href="#perangkatIoT" className="block py-2 px-3 text-white rounded md:p-0 hover:bg-gray-700 md:hover:bg-transparent hover:underline">
                              Perangkat IoT
                          </motion.a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
  )
}

export default NavbarPage
