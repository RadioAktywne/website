/**
 * Generated by orval v6.19.1 🍺
 * Do not edit manually.
 * api
 * surveys api
 * OpenAPI spec version: 0.1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  FormsIdGet400,
  FormsIdGet404,
  FormsIdSubmitSubmit400,
  FormsIdSubmitSubmit404,
  FormsIdSubmitSubmit422,
  FormsList400,
  FormsListParams,
  GetResponse,
  ListResponse,
  SubmitRequest,
  SubmitResponse,
} from "./models";

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

/**
 * List all forms with pagination
 * @summary List all
 */
export const formsList = (
  params?: FormsListParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<ListResponse>> => {
  return axios.get(`/forms`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getFormsListQueryKey = (params?: FormsListParams) => {
  return [`/forms`, ...(params ? [params] : [])] as const;
};

export const getFormsListQueryOptions = <
  TData = Awaited<ReturnType<typeof formsList>>,
  TError = AxiosError<FormsList400>,
>(
  params?: FormsListParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof formsList>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getFormsListQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof formsList>>> = ({
    signal,
  }) => formsList(params, { signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof formsList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type FormsListQueryResult = NonNullable<
  Awaited<ReturnType<typeof formsList>>
>;
export type FormsListQueryError = AxiosError<FormsList400>;

/**
 * @summary List all
 */
export const useFormsList = <
  TData = Awaited<ReturnType<typeof formsList>>,
  TError = AxiosError<FormsList400>,
>(
  params?: FormsListParams,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof formsList>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getFormsListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Get form by ID
 * @summary Get form
 */
export const formsIdGet = (
  id: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<GetResponse>> => {
  return axios.get(`/forms/${id}`, options);
};

export const getFormsIdGetQueryKey = (id: string) => {
  return [`/forms/${id}`] as const;
};

export const getFormsIdGetQueryOptions = <
  TData = Awaited<ReturnType<typeof formsIdGet>>,
  TError = AxiosError<FormsIdGet400 | FormsIdGet404>,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof formsIdGet>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getFormsIdGetQueryKey(id);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof formsIdGet>>> = ({
    signal,
  }) => formsIdGet(id, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!id,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof formsIdGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type FormsIdGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof formsIdGet>>
>;
export type FormsIdGetQueryError = AxiosError<FormsIdGet400 | FormsIdGet404>;

/**
 * @summary Get form
 */
export const useFormsIdGet = <
  TData = Awaited<ReturnType<typeof formsIdGet>>,
  TError = AxiosError<FormsIdGet400 | FormsIdGet404>,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof formsIdGet>>,
      TError,
      TData
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getFormsIdGetQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Submit a form
 * @summary Submit form
 */
export const formsIdSubmitSubmit = (
  id: string,
  submitRequest: SubmitRequest,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<SubmitResponse>> => {
  return axios.post(`/forms/${id}/submit`, submitRequest, options);
};

export const getFormsIdSubmitSubmitMutationOptions = <
  TError = AxiosError<
    FormsIdSubmitSubmit400 | FormsIdSubmitSubmit404 | FormsIdSubmitSubmit422
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof formsIdSubmitSubmit>>,
    TError,
    { id: string; data: SubmitRequest },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof formsIdSubmitSubmit>>,
  TError,
  { id: string; data: SubmitRequest },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof formsIdSubmitSubmit>>,
    { id: string; data: SubmitRequest }
  > = (props) => {
    const { id, data } = props ?? {};

    return formsIdSubmitSubmit(id, data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type FormsIdSubmitSubmitMutationResult = NonNullable<
  Awaited<ReturnType<typeof formsIdSubmitSubmit>>
>;
export type FormsIdSubmitSubmitMutationBody = SubmitRequest;
export type FormsIdSubmitSubmitMutationError = AxiosError<
  FormsIdSubmitSubmit400 | FormsIdSubmitSubmit404 | FormsIdSubmitSubmit422
>;

/**
 * @summary Submit form
 */
export const useFormsIdSubmitSubmit = <
  TError = AxiosError<
    FormsIdSubmitSubmit400 | FormsIdSubmitSubmit404 | FormsIdSubmitSubmit422
  >,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof formsIdSubmitSubmit>>,
    TError,
    { id: string; data: SubmitRequest },
    TContext
  >;
  axios?: AxiosRequestConfig;
}) => {
  const mutationOptions = getFormsIdSubmitSubmitMutationOptions(options);

  return useMutation(mutationOptions);
};
