'use client';
import SideBar from "@/components/Sidebar";
import axios from "axios";
import Modal from "@/components/Modal";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BtnBack, BtnChange } from "@/components/Button";
import Link from "next/link";


export default function FormEditKaryawan() {
    const {id_karyawan} = useParams();
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [nomorHp, setNomorHp] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useRouter();

    useEffect(() => {
        const getKaryawanByID = async() => {
            try {
                const response = await axios.get(`/api/employee/${id_karyawan}`);
                const {nama, alamat, no_hp, jabatan} = response.data;

                setNama(nama);
                setAlamat(alamat);
                setNomorHp(no_hp);
                setJabatan(jabatan);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getKaryawanByID();
    }, [id_karyawan]);

    const updateKaryawan = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/employee/${id_karyawan}`, {
                nama: nama,
                alamat: alamat,
                no_hp: nomorHp,
                jabatan: jabatan
            });
            setMessage(response.data.message);
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigate.push('/admin/data-karyawan');
            }, 2000)
        } catch(error) {
            console.error("Error : ", error);
        }
    }    


    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto px-4 mt-10">
                <div className="rounded-xl shadow-md max-w-md">
                    <h1 className="font-medium text-4xl">Form ubah data karyawan</h1>
                    <div className="p-6">
                        <form onSubmit={updateKaryawan}>
                            <div className="mb-4">
                                <label htmlFor="nama" className="block text-sm font-medium mb-1">Nama Karyawan:</label>
                                <input type="text" id="nama" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="alamat" className="block text-sm font-medium mb-1">Alamat</label>
                                <input type="text" id="alamat" name="alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="no_hp" className="block text-sm font-medium mb-1">Nomor HP</label>
                                <input type="text" id="no_hp" name="no_hp" value={nomorHp} onChange={(e) => setNomorHp(e.target.value)} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jabatan" className="block text-sm font-medium mb-1">Jabatan</label>
                                <input type="text" id="jabatan" name="jabatan" value={jabatan} onChange={(e) => setJabatan(e.target.value)} className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <BtnChange/>
                            </div>
                        </form> 
                        {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
                    </div>
                </div>
                <Link href={'/admin/data-karyawan'}>
                    <BtnBack/>
                </Link>
            </div>
        </div>
    );
}