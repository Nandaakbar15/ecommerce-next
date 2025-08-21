import { NextResponse } from "next/server";
import { prisma } from "../prisma";

export async function getAllEmployee() {
    try {
        return await prisma.employee.findMany();
    } catch(error) {
        console.error("Error : ", error);
        NextResponse.json({
            'statusCode': 404,
            'message': 'Error! Could not fetch the data.'
        })
    }
}

export async function getEmployeeById(id_karyawan: number) {
    try {
        return await prisma.employee.findUnique({
            where: {id_karyawan: id_karyawan}
        });
    } catch(error) {
        console.error("Error : ", error);
        return NextResponse.json({
            'statusCode': 404,
            'message': 'Error! Data with data is not found.'
        });
    }
}

export async function createEmployee(req: Request) {
    try {   
        const {nama, alamat, no_hp, jabatan} = await req.json();

        const employee = {
            nama,
            alamat,
            no_hp,
            jabatan
        }

        const addNewEmployee = await prisma.employee.create({
            data: employee
        });

        return NextResponse.json({
            'statusCode': 200,
            'message': 'Successfully add new data!',
            'data': addNewEmployee
        });


    } catch(error) {
        console.error("Error : ", error);
        return NextResponse.json({
            'statusCode': 404,
            'message': 'Error! Could not add the data.'
        });
    }
}