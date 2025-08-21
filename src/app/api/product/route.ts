import { getAllProducts, createProducts } from "@/app/lib/controllers/dataProductController";
import { NextResponse } from "next/server";

export async function GET() {
    const product = await getAllProducts();

    return NextResponse.json({
        'statusCode': 200,
        'data': product
    });
}

export async function POST(req: Request) {
    return await createProducts(req);
}