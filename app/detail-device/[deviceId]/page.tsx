"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  filename: string;
  device_id: string;
  upload_time: string;
}

// @ts-expect-error params
const DetailDevice = ({ params }) => {
  const deviceId = params.deviceId;
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/images`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'ngrok-skip-browser-warning': "true"
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
    <div className='mx-2 md:mx-16 mt-20 text-white'>
      <div className='flex flex-col lg:flex-row gap-4'>
        <div className="w-full lg:w-1/2 h-64 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white text-center">Keterangan Tempat</h5>
          </a>
          <table className="w-full text-white mt-4">
            <tr>
              <td className="py-1">Device Id</td>
              <td className="py-1">:</td>
              <td className="py-1">{deviceId}</td>
            </tr>
            <tr>
              <td className="py-1">Nama Kelurahan</td>
              <td className="py-1">:</td>
              <td className="py-1">{deviceId === '001' ? 'Kelurahan Pulau Buluh' : 'Kelurahan Tj. Uma'}</td>
            </tr>
          </table>
          <div className="mt-4">
            <label htmlFor="search" className="block text-sm font-medium text-white mb-2">Search Tanggal & Waktu</label>
            <input
              type="text"
              id="search"
              name='search'
              className="block w-full p-2.5 text-gray-900 rounded-lg border border-gray-600 bg-gray-700 focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Cari..."
            />
          </div>
        </div>
        <div className="relative overflow-x-auto w-full">
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
    </div>
  );
}

export default DetailDevice;