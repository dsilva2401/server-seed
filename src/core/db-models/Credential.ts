
import {BaseModel} from './BaseModel.ts';

export interface Credential extends BaseModel {
    email: string,
    password: string
}