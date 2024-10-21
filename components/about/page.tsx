"use client"

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const position = window.scrollY;
        if (position > 100) { // Ganti 100 dengan nilai sesuai kebutuhan
            setIsVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <section className="pt-8" id='tentang'>
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
                <motion.h1
                    initial={{ y: -100, opacity: 0 }}
                    animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='text-center text-white text-3xl md:text-5xl font-extrabold'>
                    Tentang Kami
                </motion.h1>
                <div className='flex flex-wrap lg:grid lg:grid-cols-2 mt-8 gap-10 text-xl text-white'>
                    <div>
                        <motion.p
                            initial={{ x: -100, opacity: 0 }} // Dari kiri
                            animate={isVisible ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="indent-14 text-justify">
                            Kami adalah tim yang berkomitmen untuk menciptakan solusi inovatif dalam pengelolaan limbah melalui pemantauan cerdas. Dengan memanfaatkan teknologi Internet of Things (IoT), kami mengembangkan sistem yang mampu mengumpulkan data real-time mengenai status dan lokasi sampah. Data ini kemudian dianalisis menggunakan algoritma Machine Learning untuk mengoptimalkan pengelolaan limbah.
                        </motion.p>
                    </div>
                    <div>
                        <motion.p
                            initial={{ x: 100, opacity: 0 }} // Dari kanan
                            animate={isVisible ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="indent-14 text-justify">
                            Visi kami adalah menciptakan lingkungan yang lebih bersih dan sehat melalui teknologi. Dengan memanfaatkan data yang akurat dan analisis yang mendalam, kami bertujuan untuk membantu pemerintah dan masyarakat dalam mengambil tindakan yang lebih efisien dalam pengelolaan limbah. Kami percaya bahwa teknologi dapat menjadi alat yang kuat untuk mendorong perubahan positif dan menciptakan masa depan yang lebih berkelanjutan.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutPage

// developed by Natagw, natagw.my.id