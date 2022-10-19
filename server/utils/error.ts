export class CustomError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,

    // eslint-disable-next-line
    private readonly cause?: any
  ) {
    super(message);
  }

  getCauseMessage(): string {
    if(this.cause instanceof Error) {
      return this.cause.stack || this.cause.message;
    }

    return String(this.cause);
  }
}
