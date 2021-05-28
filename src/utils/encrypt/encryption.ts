import * as bcrypt from "bcrypt";

export class Encryption {
  private static instance: Encryption | undefined = undefined;

  public static getInstance() {
    if (this.instance !== undefined) return this.instance;
    this.instance = new Encryption();
    return this.instance;
  }
  hash = async (password: string, strength: number): Promise<string> => {
    return await bcrypt.hash(password, strength);
  };
  compare = async (passwordOne: string, passwordTwo: string) => {
    return await bcrypt.compare(passwordOne, passwordTwo);
  };
}
