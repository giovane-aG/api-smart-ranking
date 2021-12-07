import { Schema } from "mongoose";

export const usuarioSchema = new Schema({
  nome: { type: String },
  email: { type: String },
  senha: { type: String },
  isAdm: { type: Boolean }
}, { timestamps: true, collection: 'usuarios' });