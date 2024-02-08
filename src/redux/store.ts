import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { productAPI } from "./api/productAPI";
import { userReducer } from "./reducer/useReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
    reducer: {
        "userApi": userAPI.reducer, 
        "userReducer": userReducer.reducer,
        [productAPI.reducerPath]: productAPI.reducer,
        [cartReducer.name] : cartReducer.reducer,
        "orderApi": orderApi.reducer,
        "dashboardApi": dashboardApi.reducer,
    },

    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(userAPI.middleware)
    .concat(productAPI.middleware)
    .concat(orderApi.middleware)
    .concat(dashboardApi.middleware)
    

    
    // [userAPI.middleware, productAPI.middleware],
});

export type RootState = ReturnType<typeof store.getState>;



// import { configureStore } from "@reduxjs/toolkit";
// import { userAPI } from "./api/userAPI";
// import { userReducer } from "./reducer/userReducer";
// import { productAPI } from "./api/productAPI";
// import { cartReducer } from "./reducer/cartReducer";
// import { orderAPI } from "./api/orderAPI";
 
// export const server = import.meta.env.VITE_SERVER;
 
// export const store = configureStore({
//   reducer: {
//     [userAPI.reducerPath]: userAPI.reducer,
//     [userReducer.name]: userReducer.reducer,
//     [productAPI.reducerPath]: productAPI.reducer,
//     [cartReducer.name]: cartReducer.reducer,
//     [orderAPI.reducerPath]: orderAPI.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware()
//       .concat(userAPI.middleware)
//       .concat(productAPI.middleware)
//       .concat(orderAPI.middleware),
// });
 
// export type RootState = ReturnType<typeof store.getState>;