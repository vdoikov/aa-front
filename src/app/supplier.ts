export interface ISupplier {
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  edrpo: string | null;
  email: string | null;
}

export class Supplier {
  public constructor(init?: Partial<ISupplier>) {
    Object.assign(this, init);
  }
}
