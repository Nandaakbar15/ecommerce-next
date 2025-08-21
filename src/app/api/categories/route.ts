import { getAllCategories } from "@/app/lib/controllers/dataCategoryController";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await getAllCategories();

    return NextResponse.json({
        'statusCode': 200,
        'data': categories
    });
}