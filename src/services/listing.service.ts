import { apiSlice } from "./base-query";

export const listingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListing: builder.query({
      query: () => ({
        url: "/listings",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListingQuery } = listingApi;
