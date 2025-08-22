interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

interface ButtonWithClickProps {
  onClick: () => void;
}


export default function Button({children}: ButtonProps) {
    return (
        <div className="button-body">
            {children}
        </div>
    );
}

export function BtnAdd() {
    return (
        <div className="button-add">
            <button className="bg-green-500 rounded-lg px-4 py-2 inline-block text-white hover:bg-green-700 font-bold" type="submit">Tambah</button>
        </div>
    );
}

export function BtnChange() {
    return (
        <div className="button-update">
            <button className="bg-slate-400 rounded-lg px-4 py-2 inline-block text-white hover:bg-slate-700 font-bold" type="submit">Ubah</button>
        </div>
    );
}

export function BtnBack() {
    return (
        <div className="button-back">
            <button type="submit" className="bg-slate-300 rounded-lg px-4 py-2 inline-block hover:bg-slate-500 font-bold">Kembali</button>
        </div>
    );
}

export function BtnDelete({onClick}: ButtonWithClickProps) {
    return (
        <div className="button-delete">
            <button className="bg-red-500 rounded-lg px-4 py-2 inline-block text-white hover:bg-red-700 font-bold" onClick={onClick}>Hapus</button>
        </div>
    );
}