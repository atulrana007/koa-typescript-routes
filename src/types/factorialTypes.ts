type Response = {
  data: {
    factorial: {
      value: number;
      timeTaken: number; // time in millisecond
    };
  };
};
type errorResponse = {
  error: {
    reason: string;
    dateTime: Date;
    message: string;
    details: {
      [key: string]: any;
    };
  };
};
export { Response, errorResponse };
