import { getEmployeeById } from "@/app/lib/controllers/dataEmployeeController";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: {
    id_karyawan: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const { id_karyawan } = params;

  const employeeId = parseInt(id_karyawan);

  const employee = await getEmployeeById(employeeId);

  // Cek apakah data ditemukan sebelum mengembalikan respons
  if (!employee) {
    return NextResponse.json(
      { message: "Employee not found", status: 404 },
      { status: 404 }
    );
  }


  return NextResponse.json(employee);
}