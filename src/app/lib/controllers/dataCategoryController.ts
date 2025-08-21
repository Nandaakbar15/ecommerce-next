import { NextResponse } from 'next/server';
import {prisma} from '../prisma';

export async function getAllCategories() {
    try {
        return await prisma.category.findMany();
    } catch(error) {
        console.error("Error : ", error);
        NextResponse.json({
            'statusCode': 404,
            'message': 'Error! Could not fetch the data'
        })
    }
}