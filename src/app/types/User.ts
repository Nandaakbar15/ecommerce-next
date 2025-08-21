import { Order } from "./Order"

export type User = {
    email: string,
    name: string,
    password: string
    orders?: Order[]
}