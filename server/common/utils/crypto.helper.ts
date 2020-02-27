import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
  encrypt: (data: any) => bcrypt.hash(data, saltRounds),
  encryptSync: (data: any) => bcrypt.hashSync(data, saltRounds),
  compare: (data: any, encrypted: string) => bcrypt.compare(data, encrypted)
};
