import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { AllUserResponse, DeleteProductRequest, DeleteUserRequest, MessageResponse, UserResponse } from "../../types/api-types";
import { User } from "../../types/types";
// import { server } from "../store";

export const userAPI = createApi({
    reducerPath : "userApi",
    baseQuery : fetchBaseQuery({baseUrl:`http://localhost:8000/api/v1/user/`}),
    tagTypes: ["users"],
    endpoints : (builder) => ({
        login : builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body:user,
            }),
            invalidatesTags: ["users"]
        }),

        deleteUser : builder.mutation<MessageResponse, 
        DeleteUserRequest>({
            query: ({userId, adminUserId}) => ({
                url: `${userId}?id=${adminUserId}`,
                method: "DELETE",
                
            }),
            invalidatesTags: ["users"]
        }),

            allUsers : builder.query<AllUserResponse, string>({
                query: (id) => `all?${id}`,
                providesTags: ["users"],
            })
    }),
});

export const getUser = async(id: string) => {
    try{
        const {data}:{data:UserResponse} = 
        await axios.get(`http://localhost:8000/api/v1/user/${id}`);
        
         
        return data;

    }
    catch(error) {
        throw error;
    }
}

export const {useLoginMutation,
                useAllUsersQuery,
                useDeleteUserMutation
} = userAPI;