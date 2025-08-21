/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import SideBar from "@/components/Sidebar"
import axios from "axios";
import { useState } from "react";

export default function FormTambahKaryawan() {
    const [namakaryawan, setNamaKaryawan] = useState("");
    const [alamat, setAlamat] = useState("");
    const [jabatan, setJabatan] = useState("");
    const [nomorHp, setNomorHp] = useState("");


    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 overflow-y-auto">
                <div className="rounded-xl shadow-md max-w-md mt-5">
                    <div className="p-6">
                        <form action="/action_page.php">
                            <div className="mb-4">
                                <label htmlFor="fname" className="block text-sm font-medium mb-1">Nama Karyawan:</label>
                                <input type="text" id="fname" name="nama" value="John" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fname" className="block text-sm font-medium mb-1">Alamat</label>
                                <input type="text" id="fname" name="fname" value="John" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fname" className="block text-sm font-medium mb-1">Nomor HP</label>
                                <input type="text" id="fname" name="fname" value="John" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fname" className="block text-sm font-medium mb-1">Jabatan</label>
                                <input type="text" id="fname" name="fname" value="John" className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            </div>
                        </form> 
                    </div>
                    
                </div>
            </div>
        </div>
    );
}