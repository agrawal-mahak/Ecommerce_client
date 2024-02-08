// import TableHOC from "../components/admin/TableHOC"
// import {ReactElement} from "react"
// import {useState, useEffect} from "react"
// import {Link} from 'react-router-dom'
// // import { Column } from 'some-library';
// import {Column} from 'react-table'
// // import {Column} from 'some-library'; 
// import {useSelector} from "react-redux"

// type DataType = {
//     _id: string;
//     amount: number;
//     quantity: number;
//     discount: number;
//     status: ReactElement;
//     action : ReactElement;
// };

// const column : Column<DataType>[] =[
//         {
//             Header :"ID",
//             accessor :"_id",
//         },
//         {
//             Header :"Quantity",
//             accessor :"quantity",
//         },
//         {
//             Header :"Discount",
//             accessor :"discount",
//         },
//         {
//             Header :"Amount",
//             accessor :"amount",
//         },
//         {
//             Header :"Status",
//             accessor :"status",
//         },
//         {
//             Header :"Action",
//             accessor :"action",
//         }, 
// ]

// const Orders = () => {

   
//     const [rows] = useState<DataType[]>([
//         {
//             _id: "asdzscz",
//             amount: 89787,
//             quantity: 88,
//             discount: 99,
//             status: <span className="red">Processing</span>,
//             action : <Link to={`/order/asdzscz`}>View</Link>
//         }
//     ])
        
//      const Table = TableHOC<DataType> (
//         column,
//         rows,
//         "dashboard-product-box",
//         "Orders",
//      )();
//   return (
//     <div className="container ">
//         <h1>My Orders</h1>
//         {Table}
//     </div>
//   )
// }

// export default Orders






import TableHOC from "../components/admin/TableHOC"
import {ReactElement} from "react"
import {useState, useEffect} from "react"
import {Link} from 'react-router-dom'
import {Column} from 'react-table'
import {useSelector} from "react-redux"
import { UserReducerInitialState } from "../types/reducer-types"
import { useAllOrdersQuery, useMyOrdersQuery } from "../redux/api/orderAPI"
import toast from "react-hot-toast"
import { CustomError } from "../types/api-types"
import { Skeleton } from "../components/loader"

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action : ReactElement;
};

const column : Column<DataType>[] =[
        {
            Header :"ID",
            accessor :"_id",
        },
        {
            Header :"Quantity",
            accessor :"quantity",
        },
        {
            Header :"Discount",
            accessor :"discount",
        },
        {
            Header :"Amount",
            accessor :"amount",
        },
        {
            Header :"Status",
            accessor :"status",
        },
        {
            Header :"Action",
            accessor :"action",
        }, 
]

const Orders = () => {

    const {user} = useSelector((state: {userReducer : UserReducerInitialState}) => state.userReducer);
   
    const {isLoading, data, isError , error} = useMyOrdersQuery(user?._id!);

   
    const [rows ,setRows] = useState<DataType[]>([]);
    if(isError) 
    toast.error(
      (error as CustomError).data.message);
  
      useEffect(() => {
        if(data) 
          
          setRows(
            data.orders.map((i) => ({
               _id: i._id,
               amount:i.total,
               discount: i.discount,
               quantity: i.orderItems.length,
               status: <span className={
                i.status === "Processing"
                ? "red"
                : i.status === "Shipped" 
                ? "green" : "purple"
               }
               
               >{i.status}</span>,
               action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
        })));
       }, [ ]);
  
        
     const Table = TableHOC<DataType> (
        column,
        rows,
        "dashboard-product-box",
        "Orders",
     )();
  return (
    <div className="container ">
        <h1>My Orders</h1>
        <main>{isLoading ? <Skeleton/> :Table}</main>
    </div>
  )
}

export default Orders