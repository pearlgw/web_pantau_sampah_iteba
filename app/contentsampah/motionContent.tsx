/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

const MotionContent = () => {
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
        <motion.h1
            ref={ref} // Menambahkan referensi ke elemen
            initial={{ y: -100, opacity: 0 }}
            animate={isVisible ? { y: 0, opacity: 1 } : {}} // Menerapkan animasi jika elemen terlihat
            transition={{ duration: 3 }}
            className='text-center text-white text-3xl md:text-5xl font-extrabold'
        >
            Pantauan Sampah
        </motion.h1>
    );
}

export default MotionContent;
