export interface IEncryption {
  hash: (password: string, strength: number) => Promise<any>;
  compare: (passwordOne: string, passwordTwo: string) => any;
}
