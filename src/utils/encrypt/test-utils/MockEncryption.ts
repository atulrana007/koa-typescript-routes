import * as bcrypt from "bcrypt";
import { IEncryption } from "../../../interface";

export class MockEncryption implements IEncryption {
  private hashResponse: string;
  private compareResponse: boolean;
  constructor() {}
  setResponse = (message: any) => {
    this.hashResponse = message.hashResponse;
    this.compareResponse = message.compareResponse;
  };
  hash = async (password: string, strength: number): Promise<string> => {
    return Promise.resolve(this.hashResponse);
  };
  compare = async (passwordOne: string, passwordTwo: string) => {
    return Promise.resolve(this.compareResponse);
  };
}
