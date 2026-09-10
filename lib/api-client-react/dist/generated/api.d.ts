import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { AdminLoginInput, AdminSession, BlogPost, Booking, BookingInput, BookingReply, BookingReplyInput, BookingUpdateInput, ChatMessageInput, CompanyStats, ContactInput, ContentCommand, ContentDeleteInput, ContentRecord, ContentSchema, DeleteContentRecord200, ErrorResponse, HealthStatus, JobApplicationInput, NewsletterInput, Product, Role, SitePages, SuccessResponse, Testimonial } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getGetSitePagesUrl: () => string;
/**
 * Published copy for the fixed website pages.
 * @summary getSitePages
 */
export declare const getSitePages: (options?: Parameters<typeof customFetch>[1]) => Promise<SitePages>;
export declare const getGetSitePagesQueryKey: () => readonly ["/api/site/pages"];
export declare const getGetSitePagesQueryOptions: <TData = Awaited<ReturnType<typeof getSitePages>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSitePages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSitePages>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSitePagesQueryResult = NonNullable<Awaited<ReturnType<typeof getSitePages>>>;
export type GetSitePagesQueryError = ErrorType<ErrorResponse>;
/**
 * @summary getSitePages
 */
export declare function useGetSitePages<TData = Awaited<ReturnType<typeof getSitePages>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSitePages>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetContentSchemaUrl: () => string;
/**
 * @summary getContentSchema
 */
export declare const getContentSchema: (options?: Parameters<typeof customFetch>[1]) => Promise<ContentSchema>;
export declare const getGetContentSchemaQueryKey: () => readonly ["/api/admin/content/schema"];
export declare const getGetContentSchemaQueryOptions: <TData = Awaited<ReturnType<typeof getContentSchema>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContentSchema>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getContentSchema>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetContentSchemaQueryResult = NonNullable<Awaited<ReturnType<typeof getContentSchema>>>;
export type GetContentSchemaQueryError = ErrorType<ErrorResponse>;
/**
 * @summary getContentSchema
 */
export declare function useGetContentSchema<TData = Awaited<ReturnType<typeof getContentSchema>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getContentSchema>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListContentRecordsUrl: (kind: string) => string;
/**
 * @summary listContentRecords
 */
export declare const listContentRecords: (kind: string, options?: Parameters<typeof customFetch>[1]) => Promise<ContentRecord[]>;
export declare const getListContentRecordsQueryKey: (kind: string) => readonly [`/api/admin/content/${string}`];
export declare const getListContentRecordsQueryOptions: <TData = Awaited<ReturnType<typeof listContentRecords>>, TError = ErrorType<ErrorResponse>>(kind: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContentRecords>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listContentRecords>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListContentRecordsQueryResult = NonNullable<Awaited<ReturnType<typeof listContentRecords>>>;
export type ListContentRecordsQueryError = ErrorType<ErrorResponse>;
/**
 * @summary listContentRecords
 */
export declare function useListContentRecords<TData = Awaited<ReturnType<typeof listContentRecords>>, TError = ErrorType<ErrorResponse>>(kind: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listContentRecords>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSaveContentRecordUrl: (kind: string, id: string) => string;
/**
 * Save draft, publish or unpublish. Version zero creates a collection item. Existing records require their current version.
 * @summary saveContentRecord
 */
export declare const saveContentRecord: (kind: string, id: string, contentCommand: ContentCommand, options?: Parameters<typeof customFetch>[1]) => Promise<ContentRecord>;
export declare const getSaveContentRecordMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof saveContentRecord>>, TError, {
        kind: string;
        id: string;
        data: BodyType<ContentCommand>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof saveContentRecord>>, TError, {
    kind: string;
    id: string;
    data: BodyType<ContentCommand>;
}, TContext>;
export type SaveContentRecordMutationResult = NonNullable<Awaited<ReturnType<typeof saveContentRecord>>>;
export type SaveContentRecordMutationBody = BodyType<ContentCommand>;
export type SaveContentRecordMutationError = ErrorType<ErrorResponse>;
/**
* @summary saveContentRecord
*/
export declare const useSaveContentRecord: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof saveContentRecord>>, TError, {
        kind: string;
        id: string;
        data: BodyType<ContentCommand>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof saveContentRecord>>, TError, {
    kind: string;
    id: string;
    data: BodyType<ContentCommand>;
}, TContext>;
export declare const getDeleteContentRecordUrl: (kind: string, id: string) => string;
/**
 * @summary deleteContentRecord
 */
export declare const deleteContentRecord: (kind: string, id: string, contentDeleteInput: ContentDeleteInput, options?: Parameters<typeof customFetch>[1]) => Promise<DeleteContentRecord200>;
export declare const getDeleteContentRecordMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteContentRecord>>, TError, {
        kind: string;
        id: string;
        data: BodyType<ContentDeleteInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteContentRecord>>, TError, {
    kind: string;
    id: string;
    data: BodyType<ContentDeleteInput>;
}, TContext>;
export type DeleteContentRecordMutationResult = NonNullable<Awaited<ReturnType<typeof deleteContentRecord>>>;
export type DeleteContentRecordMutationBody = BodyType<ContentDeleteInput>;
export type DeleteContentRecordMutationError = ErrorType<ErrorResponse>;
/**
* @summary deleteContentRecord
*/
export declare const useDeleteContentRecord: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteContentRecord>>, TError, {
        kind: string;
        id: string;
        data: BodyType<ContentDeleteInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteContentRecord>>, TError, {
    kind: string;
    id: string;
    data: BodyType<ContentDeleteInput>;
}, TContext>;
export declare const getListBookingRepliesUrl: (id: string) => string;
/**
 * @summary listBookingReplies
 */
export declare const listBookingReplies: (id: string, options?: Parameters<typeof customFetch>[1]) => Promise<BookingReply[]>;
export declare const getListBookingRepliesQueryKey: (id: string) => readonly [`/api/admin/bookings/${string}/replies`];
export declare const getListBookingRepliesQueryOptions: <TData = Awaited<ReturnType<typeof listBookingReplies>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookingReplies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookingReplies>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingRepliesQueryResult = NonNullable<Awaited<ReturnType<typeof listBookingReplies>>>;
export type ListBookingRepliesQueryError = ErrorType<ErrorResponse>;
/**
 * @summary listBookingReplies
 */
export declare function useListBookingReplies<TData = Awaited<ReturnType<typeof listBookingReplies>>, TError = ErrorType<ErrorResponse>>(id: string, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookingReplies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSendBookingReplyUrl: (id: string) => string;
/**
 * Sends a customer email. Reuse the request UUID for retries; repeated IDs never send twice. sent means mail server accepted, not confirmed inbox delivery.
 * @summary sendBookingReply
 */
export declare const sendBookingReply: (id: string, bookingReplyInput: BookingReplyInput, options?: Parameters<typeof customFetch>[1]) => Promise<BookingReply>;
export declare const getSendBookingReplyMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendBookingReply>>, TError, {
        id: string;
        data: BodyType<BookingReplyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof sendBookingReply>>, TError, {
    id: string;
    data: BodyType<BookingReplyInput>;
}, TContext>;
export type SendBookingReplyMutationResult = NonNullable<Awaited<ReturnType<typeof sendBookingReply>>>;
export type SendBookingReplyMutationBody = BodyType<BookingReplyInput>;
export type SendBookingReplyMutationError = ErrorType<ErrorResponse>;
/**
* @summary sendBookingReply
*/
export declare const useSendBookingReply: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof sendBookingReply>>, TError, {
        id: string;
        data: BodyType<BookingReplyInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof sendBookingReply>>, TError, {
    id: string;
    data: BodyType<BookingReplyInput>;
}, TContext>;
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
export declare const getSubmitBookingUrl: () => string;
/**
 * @summary Submit a consultation booking request
 */
export declare const submitBooking: (bookingInput: BookingInput, options?: Parameters<typeof customFetch>[1]) => Promise<SuccessResponse>;
export declare const getSubmitBookingMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof submitBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export type SubmitBookingMutationResult = NonNullable<Awaited<ReturnType<typeof submitBooking>>>;
export type SubmitBookingMutationBody = BodyType<BookingInput>;
export type SubmitBookingMutationError = ErrorType<ErrorResponse>;
/**
* @summary Submit a consultation booking request
*/
export declare const useSubmitBooking: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitBooking>>, TError, {
        data: BodyType<BookingInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof submitBooking>>, TError, {
    data: BodyType<BookingInput>;
}, TContext>;
export declare const getAdminLoginUrl: () => string;
/**
 * Same-origin JSON requests only. Send X-Admin-Request with value 1.
 * @summary Sign in to the administrator console
 */
export declare const adminLogin: (adminLoginInput: AdminLoginInput, options?: Parameters<typeof customFetch>[1]) => Promise<AdminSession>;
export declare const getAdminLoginMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminLoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminLoginInput>;
}, TContext>;
export type AdminLoginMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogin>>>;
export type AdminLoginMutationBody = BodyType<AdminLoginInput>;
export type AdminLoginMutationError = ErrorType<void>;
/**
* @summary Sign in to the administrator console
*/
export declare const useAdminLogin: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, {
        data: BodyType<AdminLoginInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, {
    data: BodyType<AdminLoginInput>;
}, TContext>;
export declare const getGetAdminSessionUrl: () => string;
/**
 * @summary Restore an administrator session
 */
export declare const getAdminSession: (options?: Parameters<typeof customFetch>[1]) => Promise<AdminSession>;
export declare const getGetAdminSessionQueryKey: () => readonly ["/api/admin/session"];
export declare const getGetAdminSessionQueryOptions: <TData = Awaited<ReturnType<typeof getAdminSession>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAdminSessionQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminSession>>>;
export type GetAdminSessionQueryError = ErrorType<void>;
/**
 * @summary Restore an administrator session
 */
export declare function useGetAdminSession<TData = Awaited<ReturnType<typeof getAdminSession>>, TError = ErrorType<void>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAdminLogoutUrl: () => string;
/**
 * @summary Revoke the current administrator session
 */
export declare const adminLogout: (options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getAdminLogoutMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
export type AdminLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogout>>>;
export type AdminLogoutMutationError = ErrorType<void>;
/**
* @summary Revoke the current administrator session
*/
export declare const useAdminLogout: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>;
export declare const getListBookingsUrl: () => string;
/**
 * @summary List consultation booking requests
 */
export declare const listBookings: (options?: Parameters<typeof customFetch>[1]) => Promise<Booking[]>;
export declare const getListBookingsQueryKey: () => readonly ["/api/admin/bookings"];
export declare const getListBookingsQueryOptions: <TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListBookingsQueryResult = NonNullable<Awaited<ReturnType<typeof listBookings>>>;
export type ListBookingsQueryError = ErrorType<ErrorResponse>;
/**
 * @summary List consultation booking requests
 */
export declare function useListBookings<TData = Awaited<ReturnType<typeof listBookings>>, TError = ErrorType<ErrorResponse>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listBookings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getUpdateBookingUrl: (id: string) => string;
/**
 * @summary Update booking status and internal notes
 */
export declare const updateBooking: (id: string, bookingUpdateInput: BookingUpdateInput, options?: Parameters<typeof customFetch>[1]) => Promise<Booking>;
export declare const getUpdateBookingMutationOptions: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: string;
        data: BodyType<BookingUpdateInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: string;
    data: BodyType<BookingUpdateInput>;
}, TContext>;
export type UpdateBookingMutationResult = NonNullable<Awaited<ReturnType<typeof updateBooking>>>;
export type UpdateBookingMutationBody = BodyType<BookingUpdateInput>;
export type UpdateBookingMutationError = ErrorType<ErrorResponse>;
/**
* @summary Update booking status and internal notes
*/
export declare const useUpdateBooking: <TError = ErrorType<ErrorResponse>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateBooking>>, TError, {
        id: string;
        data: BodyType<BookingUpdateInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateBooking>>, TError, {
    id: string;
    data: BodyType<BookingUpdateInput>;
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