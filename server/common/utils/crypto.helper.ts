import bcrypt from 'bcrypt';

const saltRounds = 10;

export default {
  encrypt: (data: any): Promise<string> => bcrypt.hash(data, saltRounds),
  encryptSync: (data: any): string => bcrypt.hashSync(data, saltRounds),
  compare: (data: any, encrypted: string): Promise<boolean> =>
    bcrypt.compare(data, encrypted)
};
