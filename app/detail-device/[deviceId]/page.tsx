"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  filename: string;
  device_id: string;
  upload_time: string;
  filename_labeled: string;
  count: number;
  level: string;
}

// @ts-expect-error params
const DetailDevice = ({ params }) => {
  const deviceId = params.deviceId;
  const [images, setImages] = useState<Image[]>([]);
  const [searchDate, setSearchDate] = useState<string>('');
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);

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

        // Filter images based on deviceId
        const filteredImages = allImages.filter((image: Image) => image.device_id === deviceId);

        // Sort images by upload time from newest to oldest
        const sortedImages = filteredImages.sort((a: Image, b: Image) => {
          return new Date(b.upload_time).getTime() - new Date(a.upload_time).getTime();
        });

        setImages(sortedImages); // Menyimpan gambar yang sudah diurutkan ke state
        setFilteredImages(sortedImages); // Menyimpan gambar yang sudah diurutkan ke state filter
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (deviceId) {
      fetchImages(); // Memanggil fungsi untuk mengambil gambar jika deviceId ada
    }
  }, [deviceId]);

  useEffect(() => {
    if (searchDate) {
      const filtered = images.filter((image) => {
        const uploadDate = new Date(image.upload_time);
        // Format the date to YYYY-MM-DD for comparison
        const formattedUploadDate = `${uploadDate.getFullYear()}-${String(uploadDate.getMonth() + 1).padStart(2, '0')}-${String(uploadDate.getDate()).padStart(2, '0')}`;
        return formattedUploadDate === searchDate; // Bandingkan dengan tanggal yang dicari
      });
      setFilteredImages(filtered); // Update filtered images
    } else {
      setFilteredImages(images); // Jika tidak ada tanggal pencarian, kembalikan semua gambar
    }
  }, [searchDate, images]);

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
              <td className="py-1">{deviceId === '001' ? 'Kelurahan Tj. Uma' : 'Kelurahan Pulau Buluh'}</td>
            </tr>
          </table>
          <div className="mt-4">
            <label htmlFor="search" className="block text-sm font-medium text-white mb-2">Search Tanggal</label>
            <input
              type="date"
              id="search"
              name='search'
              onChange={(e) => setSearchDate(e.target.value)} // Update search date state
              className="block w-full p-2.5 rounded-lg border border-gray-600 bg-gray-700"
            />
          </div>
        </div>
        <div className="relative overflow-x-auto w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700 ">
              <tr>
                <th scope="col" className="px-6 py-3">Level</th>
                <th scope="col" className="px-6 py-3">Count</th>
                <th scope="col" className="px-6 py-3">Tanggal & Waktu</th>
                <th scope="col" className="px-6 py-3">Data Dukung</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.length > 0 ? (
                filteredImages.map((image: Image, index: number) => {
                  const formattedTime = image.upload_time.slice(0, 19).replace('T', ' ');

                  return (
                    <tr key={index} className="bg-gray-800 border-b border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                        {image.level.charAt(0).toUpperCase() + image.level.slice(1)}
                      </th>
                      <td className="px-6 py-4 text-white">
                        {image.count}
                      </td>
                      <td className="px-6 py-4 text-white">
                        {formattedTime}
                      </td>
                      <td className="px-6 py-4 text-white">
                        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show/?filename=${image.filename}`}
                            alt={image.filename}
                            className="w-full md:w-1/2 object-cover rounded-lg"
                          />
                          <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/show-labeled-images/?filename=${image.filename_labeled}`}
                            alt={image.filename_labeled}
                            className="w-full md:w-1/2 object-cover rounded-lg"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-white py-4">Tidak ada gambar yang tersedia.</td>
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
