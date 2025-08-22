import { deleteProduk, getProductById, updateProduk } from "@/app/lib/controllers/dataProductController";
import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";

export async function GET(req: Request, context: {params: Promise<{id_produk: string}>}) {
    const {id_produk} = await context.params;

    const productId = parseInt(id_produk);

    const produk = await getProductById(productId);

    if(!productId) {
        return NextResponse.json({
            'statusCode': 401,
            'message': 'Data with that ID is not found'
        });
    }

    return NextResponse.json(produk);
}

export async function PUT(req: Request, context: {params: Promise<{id_produk: string}>}) {
    const {id_produk} = await context.params;

    return await updateProduk(req, parseInt(id_produk));
}

export async function DELETE(req: Request, context: {params: Promise<{id_produk: string}>}) {
    const {id_produk} = await context.params;

    return await deleteProduk(req, parseInt(id_produk));
}