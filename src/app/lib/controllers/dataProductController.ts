import { NextResponse } from 'next/server';
import { prisma } from '../prisma';
import { writeFile } from "fs/promises";
import path from "path";

export async function getAllProducts() {
    try {
        return await prisma.product.findMany();
    } catch(error) {
        console.error("Error : ", error);
        NextResponse.json({
            'statusCode': 404,
            'message': 'Error! Could not retrieve the data!'
        })
    }  
}

export async function createProducts(req: Request) {
  try {
    // ambil form data
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const stock = parseInt(formData.get("stock") as string);
    const id_kategori = parseInt(formData.get("id_kategori") as string);

    const file = formData.get("image") as File | null;
    let filePath: string | undefined;

    if (file) {
      // bikin nama unik (biar ga tabrakan)
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;

      // simpan ke folder public/images
      const uploadDir = path.join(process.cwd(), "public", "images");
      await writeFile(path.join(uploadDir, filename), buffer);

      // path yg nanti bisa dipanggil di FE
      filePath = `/images/${filename}`;
    }

    // simpan ke DB
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        stock,
        id_kategori: id_kategori,
        image: filePath, 
      },
    });

    return NextResponse.json(
      {
        statusCode: 201,
        message: "Product created successfully",
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        statusCode: 500,
        message: "Error creating product",
      },
      { status: 500 }
    );
  }
}