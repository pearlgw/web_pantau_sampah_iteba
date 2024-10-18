/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Image from 'next/image';
import MotionContent from './motionContent';
import Link from 'next/link';

interface Image {
    filename: string;
    device_id: string;
    upload_time: string;
}

const formatDateToIndo = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const ContentSampah = async () => {
    let images: Image[] = [];
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'ngrok-skip-browser-warning': "true"
            }
        });
        images = response.data;

        const targetDeviceIds = ['001', '002'];
        const imagesByDevice: { [key: string]: Image } = {};

        images.forEach((image) => {
            const deviceId = image.device_id;
            const uploadTime = new Date(image.upload_time).getTime();

            if (targetDeviceIds.includes(deviceId)) {
                if (!imagesByDevice[deviceId] || new Date(imagesByDevice[deviceId].upload_time).getTime() < uploadTime) {
                    imagesByDevice[deviceId] = image;
                }
            }
        });

        images = Object.values(imagesByDevice);

    } catch (error) {
        console.error('Error fetching images:', error);
    }

    return (
        <section className="pt-8" id='pantauSampah'>
            <div className="py-8 px-4 mx-auto max-w-screen-xl">
                <MotionContent />
                <div className='grid md:grid-cols-2 gap-4 mt-10 justify-items-center'>
                    {images.length > 0 ? (
                        images.map((image: Image, index: number) => (
                            <div key={index} className="w-full mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow my-4">
                                <div className="flex justify-between items-center p-4 border-b-2 border-gray-600">
                                    <div className="text-lg font-bold text-white">
                                        Device Id: {image.device_id}
                                    </div>
                                    <div className="text-lg font-bold text-white">
                                        {formatDateToIndo(image.upload_time)}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/2 relative overflow-hidden">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show/?filename=${image.filename}`}
                                            alt={image.filename}
                                            className="w-full h-[220px] object-cover"
                                        />
                                    </div>

                                    <div className="w-1/2 bg-gray-700 flex items-center justify-center">
                                    </div>
                                </div>

                                <div className="p-5 flex justify-between items-center">
                                    <p className="text-white">{image.device_id === '001' ? 'Kelurahan Pulau Buluh' : 'Kelurahan Tj. Uma'}</p>
                                    <Link href={`/detail-device/${image.device_id}`} className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-white'>Tidak ada gambar yang tersedia.</p>
                    )}
                </div>
                {/* <div className="text-center mt-6 md:mt-10">
                    <a href="#" className="bg-blue-900 hover:bg-blue-800 px-4 py-2 rounded-lg text-white">
                        Show All Pantauan Sampah
                    </a>
                </div> */}
            </div>
        </section>
    );
};

export default ContentSampah;
