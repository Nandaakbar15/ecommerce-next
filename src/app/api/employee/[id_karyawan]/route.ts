import { deleteEmployee, getEmployeeById, updateEmployee } from "@/app/lib/controllers/dataEmployeeController";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id_karyawan: string }> }) {
  const { id_karyawan } = await context.params;

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

export async function PUT(req: Request, context: { params: Promise<{ id_karyawan: string }> }) {
  const {id_karyawan} = await context.params;

  return await updateEmployee(req, parseInt(id_karyawan));
}

export async function DELETE(req: Request, context: { params: Promise<{ id_karyawan: string }> }) {
  const {id_karyawan} = await context.params;

  return await deleteEmployee(req, parseInt(id_karyawan));
}