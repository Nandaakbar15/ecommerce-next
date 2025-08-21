import Cards from "@/components/Cards";
import SideBar from "@/components/Sidebar"

export default function AdminPages() {
    return (
        <div className="flex h-screen">
            <SideBar/>
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-4xl font-semibold mt-5">Dashboard Admin</h1>
                <p className="font-serif text-[20px]">Welcome Admin</p>
                <div className="flex items-center">
                    <Cards/>
                    <div className="mx-1.5">
                        <Cards/>
                    </div>
                </div>
            </div>
        </div>
    );
}