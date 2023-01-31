import { Operation } from "./consts";

export interface SparkleObject {
    label: string,
    bind: string,
    operator: Operation,
    values: string[]
}