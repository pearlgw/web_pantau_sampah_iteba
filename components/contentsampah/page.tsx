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
    filename_labeled: string;
    level: string;
    count: string;
}

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
                        images.map((image: Image, index: number) => {
                            const formattedTime = image.upload_time.slice(0, 19).replace('T', ' ');
                            return (
                                <div key={index} className="w-full mx-auto bg-gray-800 border border-gray-700 rounded-lg shadow my-4">
                                    <div className="flex justify-between items-center p-4 border-b-2 border-gray-600">
                                        <div className="text-lg font-bold text-white">
                                            Device Id: {image.device_id}
                                        </div>
                                        <div className="text-lg font-bold text-white">
                                            {formattedTime}
                                        </div>
                                    </div>

                                    <div className='px-4 pt-5'>
                                        <div className="flex gap-2">
                                            <div className="w-1/2 relative overflow-hidden">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show/?filename=${image.filename}`}
                                                    alt={image.filename}
                                                    className="w-full object-cover rounded-lg"
                                                />
                                            </div>

                                            <div className="w-1/2 relative overflow-hidden">
                                                <img
                                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show-labeled-images/?filename=${image.filename_labeled}`}
                                                    alt={image.filename_labeled}
                                                    className="w-full object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center p-4 border-b-2 border-gray-600">
                                        <div className="inline-flex rounded-md shadow-sm" role="group">
                                            <p className="px-4 py-2 text-sm font-medium text-white hover:text-gray-900 bg-gray-800 border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
                                                {image.device_id === '001' ? 'Kelurahan : Tj Uma' : 'Kelurahan : Pulau Buluh'}
                                            </p>
                                            <p className='px-4 py-2 text-sm font-medium text-white hover:text-gray-900 bg-gray-800 border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'>
                                                Level: {image.level.charAt(0).toUpperCase() + image.level.slice(1)}
                                            </p>
                                            <p className='px-4 py-2 text-sm font-medium text-white hover:text-gray-900 bg-gray-800 border border-gray-200 rounded-e-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700'>
                                                Count: {image.count}
                                            </p>
                                        </div>
                                        <Link href={`/detail-device/${image.device_id}`} className="px-6 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
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
