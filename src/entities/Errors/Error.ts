import cleanstack from 'clean-stack';

export class BaseError extends Error {
  public message: string;
  public code: number;
  public name: string;
  public stackTrace: Error['stack'];
  constructor(message, code, name, location) {
        super(message)
        this.message = message;
        this.code = code;
        this.name = name;
        Error.captureStackTrace(this, location)

        this.stackTrace = cleanstack(this.stack);
  }

  public toJSON(): any {
	return {
	  error: {
		name: this.name,
		message: this.message,
		stacktrace: this.stack
	  }
	}
  }
}
