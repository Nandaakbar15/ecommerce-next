import type { Product } from "./Product"
import type { User } from "./User"

export type Order = {
    id_pesanan?: number,
    id_product?: number,
    id_user?: number,
    quantity: number,
    total: number,
    products?: Product[]
    users?: User[]
}