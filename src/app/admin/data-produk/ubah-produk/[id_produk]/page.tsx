/* eslint-disable @next/next/no-img-element */
'use client';
import SideBar from "@/components/Sidebar"
import axios from "axios";
import Modal from "@/components/Modal";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BtnChange } from "@/components/Button";

type Category = {
  id_kategori: number;
  name: string;
};

export default function FormUbahProduk() {
    const {id_produk} = useParams();
    const [namaProduk, setNamaProduk] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState<number>(0);
    const [images, setImages] = useState<File | null>(null);
    const [kategori, setKategori] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useRouter();
    const [previewImage, setPreviewImage] = useState<string>("");

    useEffect(() => {
        const getProductById = async() => {
            try {
                const response = await axios.get(`/api/product/${id_produk}`);
                const { name, description, stock, image, id_kategori } = response.data;
                setNamaProduk(name);
                setDescription(description);
                setStock(stock);
                setPreviewImage(image); // ini string path dari DB
                setKategori(id_kategori.toString());
            } catch(error) {
                console.error("Error : ", error);
            }
        }
        
        getProductById()
    }, [id_produk]);

    useEffect(() => {
        const getCategories = async() => {
            try {
                const response = await axios.get("/api/categories");
                setCategories(response.data.data);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getCategories();
    }, [])

    const updateProduk = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", namaProduk);
            formData.append("description", description);
            formData.append("stock", stock.toString());
            formData.append("id_kategori", kategori);
            if (images instanceof File) {
                formData.append("image", images);
            }

            const response = await axios.put(`/api/product/${id_produk}`, formData, {
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
        }
    }


    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="overflow-y-auto px-4 mt-10">
                <h1 className="text-4xl font-medium">Form Ubah Produk</h1>
                <div className="max-w-md bg-white rounded-xl shadow-md mt-5">
                    <div className="p-6">
                        <form onSubmit={updateProduk}>
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
                                    {previewImage && (
                                        <img
                                            src={previewImage}
                                            alt="Produk lama"
                                            className="w-32 h-32 object-cover mb-2 rounded-lg border"
                                        />
                                    )}
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
                                <div className="mb-4">
                                    <BtnChange/>
                                </div>
                        </form>
                    </div>
                    {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}      
                </div>
            </div>
        </div>
    );
}

