import express from 'express';
import * as core from 'express-serve-static-core';

// type RequestWithoutParams<P> = Omit<express.Request, 'params'> & {params: P};

// https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
export interface TypedRequest<B> extends express.Request {
  body: B;
}

export type TypedQueryRequest<Q> = express.Request<core.ParamsDictionary, any, any, Q>;

export type AuthorizedRequest<B> = TypedRequest<{userId: string} & B>;

export type EmptyAuthorizedRequest = AuthorizedRequest<Record<string, never>>;
