import express from 'express';

// type RequestWithoutParams<P> = Omit<express.Request, 'params'> & {params: P};

// https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
export interface TypedRequest<B> extends express.Request {
  body: B;
}

export type AuthorizedRequest<B> = TypedRequest<{userId: string} & B>;
