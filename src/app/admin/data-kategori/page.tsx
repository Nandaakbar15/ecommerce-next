/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import SideBar from "@/components/Sidebar"
import axios from "axios";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { Category } from "@/app/types/Category";
import Link from "next/link";

export default function DataKategoriAdmin() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const getAllCategories = async() => {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto px-4 mt-10">
                <h1 className="text-4xl font-medium">Data Kategori</h1>
                <div className="overflow-x-auto mt-5">
                    <table className="table-fixed border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Nama Kategori</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Jumlah</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category => (
                                <tr key={category.id_kategori}>
                                    <td className="border border-gray-300 px-4 py-2">{category.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{category.quantity}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition" href={`/admin/data-karyawan/ubah-karyawan/${category.id_kategori}`}>Edit</Link>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button className="bg-red-500 rounded-lg inline-block px-4 py-2">Hapus</button>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </div>
    );
}