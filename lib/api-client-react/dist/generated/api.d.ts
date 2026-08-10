import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { BlogPost, ChatMessageInput, CompanyStats, ContactInput, ErrorResponse, HealthStatus, JobApplicationInput, NewsletterInput, Product, Role, SuccessResponse, Testimonial } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitContactUrl: () => string;
/**
 * @summary Submit contact form
 */
export declare const submitContact: (contactInput: ContactInput, options?: Parameters<typeof customFetch>[1]) => Promise<SuccessResponse>;
export declare const getSubmitContactMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<ContactInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<ContactInput>;
}, TContext>;
export type SubmitContactMutationResult = NonNullable<Awaited<ReturnType<typeof submitContact>>>;
export type SubmitContactMutationBody = BodyType<ContactInput>;
export type SubmitContactMutationError = ErrorType<ErrorResponse>;
/**
* @summary Submit contact form
*/
export declare const useSubmitContact: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, {
        data: BodyType<ContactInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitContact>>, TError, {
    data: BodyType<ContactInput>;
}, TContext>;
export declare const getSubscribeNewsletterUrl: () => string;
/**
 * @summary Subscribe to newsletter
 */
export declare const subscribeNewsletter: (newsletterInput: NewsletterInput, options?: Parameters<typeof customFetch>[1]) => Promise<SuccessResponse>;
export declare const getSubscribeNewsletterMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof subscribeNewsletter>>, TError, {
        data: BodyType<NewsletterInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof subscribeNewsletter>>, TError, {
    data: BodyType<NewsletterInput>;
}, TContext>;
export type SubscribeNewsletterMutationResult = NonNullable<Awaited<ReturnType<typeof subscribeNewsletter>>>;
export type SubscribeNewsletterMutationBody = BodyType<NewsletterInput>;
export type SubscribeNewsletterMutationError = ErrorType<ErrorResponse>;
/**
* @summary Subscribe to newsletter
*/
export declare const useSubscribeNewsletter: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof subscribeNewsletter>>, TError, {
        data: BodyType<NewsletterInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof subscribeNewsletter>>, TError, {
    data: BodyType<NewsletterInput>;
}, TContext>;
export declare const getListRolesUrl: () => string;
/**
 * @summary List open job roles
 */
export declare const listRoles: (options?: Parameters<typeof customFetch>[1]) => Promise<Role[]>;
export declare const getListRolesQueryKey: () => readonly ["/api/careers/roles"];
export declare const getListRolesQueryOptions: <TData = Awaited<ReturnType<typeof listRoles>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRoles>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listRoles>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListRolesQueryResult = NonNullable<Awaited<ReturnType<typeof listRoles>>>;
export type ListRolesQueryError = ErrorType<unknown>;
/**
 * @summary List open job roles
 */
export declare function useListRoles<TData = Awaited<ReturnType<typeof listRoles>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listRoles>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitApplicationUrl: () => string;
/**
 * @summary Submit a job application
 */
export declare const submitApplication: (jobApplicationInput: JobApplicationInput, options?: Parameters<typeof customFetch>[1]) => Promise<SuccessResponse>;
export declare const getSubmitApplicationMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitApplication>>, TError, {
        data: BodyType<JobApplicationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitApplication>>, TError, {
    data: BodyType<JobApplicationInput>;
}, TContext>;
export type SubmitApplicationMutationResult = NonNullable<Awaited<ReturnType<typeof submitApplication>>>;
export type SubmitApplicationMutationBody = BodyType<JobApplicationInput>;
export type SubmitApplicationMutationError = ErrorType<ErrorResponse>;
/**
* @summary Submit a job application
*/
export declare const useSubmitApplication: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitApplication>>, TError, {
        data: BodyType<JobApplicationInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitApplication>>, TError, {
    data: BodyType<JobApplicationInput>;
}, TContext>;
export declare const getListProductsUrl: () => string;
/**
 * @summary List software products
 */
export declare const listProducts: (options?: Parameters<typeof customFetch>[1]) => Promise<Product[]>;
export declare const getListProductsQueryKey: () => readonly ["/api/products"];
export declare const getListProductsQueryOptions: <TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListProductsQueryResult = NonNullable<Awaited<ReturnType<typeof listProducts>>>;
export type ListProductsQueryError = ErrorType<unknown>;
/**
 * @summary List software products
 */
export declare function useListProducts<TData = Awaited<ReturnType<typeof listProducts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listProducts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListTestimonialsUrl: () => string;
/**
 * @summary List client testimonials
 */
export declare const listTestimonials: (options?: Parameters<typeof customFetch>[1]) => Promise<Testimonial[]>;
export declare const getListTestimonialsQueryKey: () => readonly ["/api/testimonials"];
export declare const getListTestimonialsQueryOptions: <TData = Awaited<ReturnType<typeof listTestimonials>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListTestimonialsQueryResult = NonNullable<Awaited<ReturnType<typeof listTestimonials>>>;
export type ListTestimonialsQueryError = ErrorType<unknown>;
/**
 * @summary List client testimonials
 */
export declare function useListTestimonials<TData = Awaited<ReturnType<typeof listTestimonials>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listTestimonials>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListBlogPostsUrl: () => string;
/**
 * @summary List blog posts
 */
export declare const listBlogPosts: (options?: Parameters<typeof customFetch>[1]) => Promise<BlogPost[]>;
export declare const getListBlogPostsQueryKey: () => readonly ["/api/blog/posts"];
export declare const getListBlogPostsQueryOptions: <TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBlogPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listBlogPosts>>>;
export type ListBlogPostsQueryError = ErrorType<unknown>;
/**
 * @summary List blog posts
 */
export declare function useListBlogPosts<TData = Awaited<ReturnType<typeof listBlogPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBlogPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetStatsUrl: () => string;
/**
 * @summary Get company stats for homepage
 */
export declare const getStats: (options?: Parameters<typeof customFetch>[1]) => Promise<CompanyStats>;
export declare const getGetStatsQueryKey: () => readonly ["/api/stats"];
export declare const getGetStatsQueryOptions: <TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getStats>>>;
export type GetStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get company stats for homepage
 */
export declare function useGetStats<TData = Awaited<ReturnType<typeof getStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSubmitChatMessageUrl: () => string;
/**
 * @summary Submit a chat support message
 */
export declare const submitChatMessage: (chatMessageInput: ChatMessageInput, options?: Parameters<typeof customFetch>[1]) => Promise<SuccessResponse>;
export declare const getSubmitChatMessageMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitChatMessage>>, TError, {
        data: BodyType<ChatMessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitChatMessage>>, TError, {
    data: BodyType<ChatMessageInput>;
}, TContext>;
export type SubmitChatMessageMutationResult = NonNullable<Awaited<ReturnType<typeof submitChatMessage>>>;
export type SubmitChatMessageMutationBody = BodyType<ChatMessageInput>;
export type SubmitChatMessageMutationError = ErrorType<unknown>;
/**
* @summary Submit a chat support message
*/
export declare const useSubmitChatMessage: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitChatMessage>>, TError, {
        data: BodyType<ChatMessageInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitChatMessage>>, TError, {
    data: BodyType<ChatMessageInput>;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map