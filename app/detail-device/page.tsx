"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface Image {
  filename: string;
  device_id: string;
  upload_time: string;
}

const DetailDevice = () => {
  const searchParams = useSearchParams();
  const deviceId = searchParams.get('device_id'); // Mengambil device_id dari query parameter
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const allImages = response.data;

        console.log('All Images:', allImages); // Log semua gambar
        console.log('Device ID:', deviceId); // Log device ID

        // Filter images based on deviceId
        const filteredImages = allImages.filter((image: Image) => image.device_id === deviceId);
        console.log('Filtered Images:', filteredImages); // Log gambar yang difilter

        setImages(filteredImages); // Menyimpan gambar yang difilter dalam state
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (deviceId) {
      fetchImages(); // Memanggil fungsi untuk mengambil gambar jika deviceId ada
    }
  }, [deviceId]);

  return (
    <div className='mx-16 mt-20 text-white'>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-600">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 ">
            <tr>
              <th scope="col" className="px-6 py-3">Id Device</th>
              <th scope="col" className="px-6 py-3">Tanggal & Waktu</th>
              <th scope="col" className="px-6 py-3">Data Dukung</th>
            </tr>
          </thead>
          <tbody>
            {images.length > 0 ? (
              images.map((image: Image, index: number) => (
                <tr key={index} className="bg-gray-800 border-b border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                    {image.device_id}
                  </th>
                  <td className="px-6 py-4 text-white">
                    {new Date(image.upload_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-white">
                    <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show/?filename=${image.filename}`} alt={image.filename} className="w-20 h-20 object-cover" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-white py-4">Tidak ada gambar yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailDevice;