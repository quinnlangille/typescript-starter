import { BaseError } from "./Error";

export class BadRequestError extends BaseError {
  constructor(message) {
    super(message, "400", "Bad Request Error", BadRequestError);
  }
}
