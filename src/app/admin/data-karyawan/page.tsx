'use client';
import { Employee } from "@/app/types/Employee";
import SideBar from "@/components/Sidebar"
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BtnDelete } from "@/components/Button";
import Modal from "@/components/Modal";

export default function DataKaryawanAdmin() {
    const [employee, setEmployee] = useState<Employee[]>([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useRouter();

    const getEmployee = async() => {
        try {
            const response = await axios.get('/api/employee');
            setEmployee(response.data.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteEmployee = async(id_karyawan: number) => {
        try {
            const response = await axios.delete(`/api/employee/${id_karyawan}`);
            setMessage(response.data.message);
            setShowModal(true);

            // refresh the data
            getEmployee();

            setTimeout(() => {
                setShowModal(false);
                navigate.push('/admin/data-karyawan');
            }, 2000)
            
        } catch(error) {
            console.error("Error : ", error);
        } 
    }

    useEffect(() => {
        getEmployee();
    }, [])


    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto px-4 mt-10">
                <h1 className="text-4xl font-semibold mt-5">Data Karyawan</h1>
                <h2><Link href={'/admin/data-karyawan/tambah-karyawan'} className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition mt-5">Tambah Karyawan</Link></h2>
                <div className="overflow-x-auto mt-5">
                    <table className="table-fixed border-collapse border border-gray-300 w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">Nama Karyawan</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Alamat</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Nomor Hp</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Jabatan</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.map((karyawan => (
                                <tr key={karyawan.id_karyawan}>
                                    <td className="border border-gray-300 px-4 py-2">{karyawan.nama}</td>
                                    <td className="border border-gray-300 px-4 py-2">{karyawan.alamat}</td>
                                    <td className="border border-gray-300 px-4 py-2">{karyawan.no_hp}</td>
                                    <td className="border border-gray-300 px-4 py-2">{karyawan.jabatan}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <Link className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white font-medium hover:bg-blue-600 transition" href={`/admin/data-karyawan/ubah-karyawan/${karyawan.id_karyawan}`}>Edit</Link>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <BtnDelete onClick={() => deleteEmployee(karyawan.id_karyawan)}/>
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