export type methods = "GET" | "POST";
export type Response = {
  data: {
    factorial: {
      value: number;
      timeTaken: number; // time in millisecond
    };
  };
};
export type errorResponse = {
  error: {
    reason: string;
    dateTime: Date;
    message: string;
    details?: {
      [key: string]: any;
    };
  };
};
