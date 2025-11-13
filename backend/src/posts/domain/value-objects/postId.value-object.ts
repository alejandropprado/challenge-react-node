import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class PostId {
  private constructor(private readonly _value: string) {}

  public static generate(): PostId {
    return new PostId(uuidv4());
  }

  public static from(value: string): PostId {
    if (!uuidValidate(value)) {
      throw new Error(`Invalid PostId: ${value}`);
    }
    return new PostId(value);
  }

  get value(): string {
    return this._value;
  }

  equals(other: PostId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
