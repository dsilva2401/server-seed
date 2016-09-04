
import {BaseModel} from './BaseModel.ts';

export interface Session extends BaseModel {
    personId: string,
    key: string
}