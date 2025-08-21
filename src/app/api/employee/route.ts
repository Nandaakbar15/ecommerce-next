import { createEmployee, getAllEmployee } from "@/app/lib/controllers/dataEmployeeController"
import { NextResponse } from "next/server";

export async function GET() {
    const employee = await getAllEmployee();

    return NextResponse.json({
        'statusCode': 200,
        'data': employee
    });
}

export async function POST(req: Request) {
    return await createEmployee(req);
}