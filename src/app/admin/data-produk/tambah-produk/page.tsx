'use client';
import { BtnAdd, BtnBack } from "@/components/Button";
import SideBar from "@/components/Sidebar"
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { useRouter } from 'next/navigation';
import Link from "next/link";

type Category = {
  id_kategori: number;
  name: string;
};

export default function FormTambahProdukAdmin() {
    const [namaProduk, setNamaProduk] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState<number>(0);
    const [images, setImages] = useState<File | null>(null);
    const [kategori, setKategori] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        // Fetch kategori dari API
        const fetchCategories = async () => {
            try {
                const res = await axios.get("/api/categories");
                setCategories(res.data.data);
            } catch (error) {
                console.error("Gagal fetch kategori:", error);
            }
        };
        fetchCategories();
    }, []);

    const AddNewProduct = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", namaProduk);
            formData.append("description", description);
            formData.append("stock", stock.toString());
            formData.append("id_kategori", kategori);
            if (images) {
                formData.append("image", images);
            }

            const response = await axios.post('/api/product', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage(response.data.message);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate.push('/admin/data-produk');
            }, 2000);
        } catch(error) {
            console.error("Error : ", error);
            setMessage("Error! Could not upload the data!");
            setShowModal(true);
        }
    }

    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto px-4 mt-10">
                <h1 className="text-4xl font-semibold">Form tambah produk</h1>
                <div className="max-w-md bg-white rounded-xl shadow-md border mt-5">
                    <div className="p-6">
                        <form onSubmit={AddNewProduct}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Nama Produk</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="name"
                                    value={namaProduk} 
                                    onChange={(e) => setNamaProduk(e.target.value)}
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Deskripsi Produk</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="description"
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Stock</label>
                                <input
                                    type="number"
                                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={stock}
                                    name="stock"
                                    onChange={(e) => setStock(parseInt(e.target.value))}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Kategori</label>
                                <select
                                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="id_kategori"
                                    value={kategori}
                                    onChange={(e) => setKategori(e.target.value)}
                                    required
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id_kategori} value={cat.id_kategori}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Gambar Produk</label>
                                <input
                                    type="file"
                                    className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="image"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setImages(e.target.files[0]);
                                        }
                                    }}
                                />
                            </div>

                            <BtnAdd/>
                        </form>
                        {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
                    </div>
                </div>
                <Link href={'/admin/data-produk'}>
                   <BtnBack/>                 
                </Link>
            </div>
        </div>
    );
}
