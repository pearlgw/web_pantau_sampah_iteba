/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Image from 'next/image';
import MotionContent from './motionContent';

interface Image {
    filename: string;
    device_id: string;
    upload_time: string;
}

const ContentSampah = async () => {
    let images: Image[] = [];

    try {
        const response = await axios.get('http://103.124.196.178:8000/images');
        images = response.data;
        images.sort((a, b) => new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime());
        images = images.slice(0, 6);

    } catch (error) {
        console.error('Error fetching images:', error);
    }

    return (
        <section className="pt-8" id='pantauSampah'>
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
                <MotionContent />
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 justify-items-center'>
                    {images.length > 0 ? (
                        images.map((image: Image, index: number) => (
                            <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
                                        <Image
                                            src={`http://103.124.196.178:8000/show/?filename=${image.filename}`}
                                            alt={image.filename}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </a>
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Device Id: {image.device_id}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Read more
                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>Tidak ada gambar yang tersedia.</p>
                    )}
                </div>
                <div className="text-center mt-6 md:mt-10">
                    <a href="#" className="bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-lg text-white">
                        Show All Pantauan Sampah
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContentSampah;
