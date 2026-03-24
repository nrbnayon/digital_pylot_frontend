// redux/services/authApi.ts
import { apiSlice } from './apiSlice';

interface SigninRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SigninResponse {
  user: {
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface VerifyOtpRequest {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  message: string;
  verified: boolean;
}

// Inject endpoints into the API slice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Signin endpoint
    signin: builder.mutation<SigninResponse, SigninRequest>({
      query: (credentials) => ({
        url: '/auth /signin',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Verify OTP endpoint
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (otpData) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    
    // Logout endpoint
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),
    
    // Get current user
    getCurrentUser: builder.query<SigninResponse['user'], void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useSigninMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
