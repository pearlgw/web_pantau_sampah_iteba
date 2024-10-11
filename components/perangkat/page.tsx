"use client";

import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react';

const PerangkatIoT = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLHeadingElement | null>(null); // Membuat referensi untuk elemen

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Mengatur state menjadi true ketika elemen terlihat
                    observer.disconnect(); // Menghentikan observer setelah elemen terlihat
                }
            },
            { threshold: 0.1 } // Mengatur threshold untuk kapan observer akan dipicu
        );

        if (ref.current) {
            observer.observe(ref.current); // Mengamati elemen
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current); // Menghentikan pengamatan saat komponen dibersihkan
            }
        };
    }, []);
    return (
        <section className="pt-8" id='perangkatIoT'>
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
                <motion.h1 ref={ref} // Menambahkan referensi ke elemen
                    initial={{ y: -100, opacity: 0 }}
                    animate={isVisible ? { y: 0, opacity: 1 } : {}} // Menerapkan animasi jika elemen terlihat
                    transition={{ duration: 2 }} className='text-center text-white text-3xl md:text-5xl font-extrabold'>
                    Perangkat IoT
                </motion.h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 justify-items-center px-5 md:px-14 gap-5 md:gap-10'>
                <motion.div ref={ref} // Menambahkan referensi ke elemen
                    initial={{ x: -100, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}} // Menerapkan animasi jika elemen terlihat
                    transition={{ duration: 2 }} className="relative w-full h-80">
                    <Image src={'/p1.jpg'} alt='perangkat1' layout="fill" objectFit="cover" className='rounded-xl'/>
                </motion.div>
                <motion.div ref={ref} // Menambahkan referensi ke elemen
                    initial={{ x: 100, opacity: 0 }}
                    animate={isVisible ? { x: 0, opacity: 1 } : {}} // Menerapkan animasi jika elemen terlihat
                    transition={{ duration: 2 }} className="relative w-full h-80">
                    <Image src={'/p2.jpg'} alt='perangkat2' layout="fill" objectFit="cover" className='rounded-xl'/>
                </motion.div>
            </div>
        </section>
    )
}

export default PerangkatIoT
