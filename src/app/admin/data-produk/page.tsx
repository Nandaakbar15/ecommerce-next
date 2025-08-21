'use client';
import SideBar from "@/components/Sidebar"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Product } from "@/app/types/Product";

export default function ProductDataAdmin() {
    const [products, setProducts] = useState<Product[]>([]);
    
    const getProducts = async() => {
        try {
            const response = await axios.get('/api/product');
            setProducts(response.data.data);
        } catch(error) {    
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])
    


    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto px-4 mt-10">
                <h1 className="text-4xl font-semibold mt-5">Data Produk</h1>
                <h2><Link className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition mt-5" href={'/admin/data-produk/tambah-produk'}>Tambah Produk</Link></h2>
                <div className="overflow-x-auto mt-5">
                    <table className="table-fixed border-collapse border border-gray-300 w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-left">Gambar Produk</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Nama Produk</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Deskripsi</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Stok</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product => (
                            <tr key={product.id_produk}>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Image 
                                        src={product.image || '/images/placeholder.jpg'} 
                                        alt={product.name} 
                                        width={96}  
                                        height={96}  
                                        className="rounded-lg object-cover border"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.description}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition" href={`/admin/data-produk/ubah-produk/${product.id_produk}`}>Edit</Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="bg-red-500 rounded-lg inline-block px-4 py-2">Hapus</button>
                                </td>
                            </tr>
                        )))}
                        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
}