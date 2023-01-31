import { Operation } from './consts.js';

export interface SparkleObject {
  label: string;
  bind: string;
  operator: Operation;
  values: string[];
}
