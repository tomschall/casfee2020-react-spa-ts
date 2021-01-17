import { ApolloError } from '@apollo/client';

export const logToConsole = (
  msg: string,
  ...rest: Array<Error | string | number | ApolloError | undefined>
) => {
  console.log(msg, ...rest);
};
