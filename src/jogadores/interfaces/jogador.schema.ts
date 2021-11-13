import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
  telefoneCelular: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  nome: String,
  ranking: String,
  posicaoRanking: Number,
  fotoJogador: String
}, { timestamps: true, collection: 'jogadores' });