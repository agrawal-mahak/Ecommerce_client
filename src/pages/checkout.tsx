 import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { NewOrderRequest } from '../types/api-types';
// import { RootState } from '@reduxjs/toolkit/query';
import { useNewOrderMutation } from '../redux/api/orderAPI';
import { resetCart } from '../redux/reducer/cartReducer';
import { responseToast } from '../utils/features';
// import { resetCart } from '../redux/reducer/cartReducer';
// const stripePromise = loadStripe(
//     "pk_test_51Og7RnSJkYmK2mWQ0yEZO3OzYxHojgiwCIaxSfvq006z5tim1XioKMMcwVKLHPmraLmlkNBF6q5HPubN6zX1HAwu00UKhnpnwG"
// )

const stripePromise = loadStripe(
     "pk_test_51Og7RnSJkYmK2mWQ0yEZO3OzYxHojgiwCIaxSfvq006z5tim1XioKMMcwVKLHPmraLmlkNBF6q5HPubN6zX1HAwu00UKhnpnwG"
)


const CheckOutForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {user} = useSelector((state: RootState)=> state.userReducer);

     const{
        shippingInfo,
        cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
     } = useSelector((state: RootState) => state.cartReducer);

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [newOrder] = useNewOrderMutation();


    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!stripe || !elements) return;
        setIsProcessing(true);

        const orderData: NewOrderRequest = {
            shippingInfo,
            orderItems:cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!,
         };

        const {paymentIntent,error} = await stripe.confirmPayment({
            elements,
            confirmParams: {return_url : window.location.origin},
            redirect: "if_required",
        });

        if(error) {
            setIsProcessing(false);
            return toast.error(error.message ||
                 "Something went wrong");
            }    

             navigate("/orders");
      
        if(paymentIntent.status === "succeeded") {
            const res = await newOrder(orderData);
            dispatch(resetCart());
            // console.log("Placing order");
            responseToast(res, navigate, "/orders");
        }
        setIsProcessing(false);

    };
    
  return (
      <div className='checkout-container'>
        <form onSubmit={submitHandler}>
            <PaymentElement/>
            <button type='submit' disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Pay"}
            </button>
        </form>
      </div>
  );


};

const Checkout = () => {
    const location = useLocation();

    const clientSecret : string | undefined = location.state;
    if(!clientSecret) return <Navigate to={"/shipping"}/>


    return (

        <Elements
         options={{
            clientSecret : "pi_3Oh8xeSJkYmK2mWQ1mr52huv_secret_JTjfWJtWZdYrJ41MxURy38xhb",
         }}
         stripe={stripePromise}>

            <CheckOutForm/>
        </Elements>
    )
}

export default Checkout