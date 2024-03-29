export class DatabaseError extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}
