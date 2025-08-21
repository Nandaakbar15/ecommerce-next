import Link from "next/link";

export default function SideBar() {
    return (
        <div className="bg-blue-500 w-64 p-4 py-7">
            <h1 className="text-white font-bold mb-7 text-3xl">E-Commerce</h1>
            <nav className="text-white font-sans text-[20px]">
                <ul>
                    <li className="mb-3"><Link href={'/admin'} className="hover:font-bold">Dashboard</Link></li>
                    <li className="mb-3"><Link href={'/admin/data-produk'} className="hover:font-bold">Data Produk</Link></li>
                    <li className="mb-3"><Link href={'/admin/data-kategori'} className="hover:font-bold">Data Kategori</Link></li>
                    <li className="mb-3"><Link href={'/admin/data-karyawan'} className="hover:font-bold">Data Karyawan</Link></li>
                </ul>
            </nav>
        </div>
    );
}