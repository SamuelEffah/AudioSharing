import React,{useState, useEffect} from "react";
import useSWR from "swr";
import {useRouter} from "next/router"
import axios from "axios";
import Avatar from "./avatar";
import {Spinner} from "./../icons"
import moment from "moment";
import { openUserModal } from "../shared-components/modal/user_modal";
import {useUserStore} from "../stores/useUserStore"
const fetcher = (url)=> axios.get(url).then((res)=>res.data)


// const User = ({user,...props})=>{

//   return (
//     <div title="user" className="w-full h-10 flex items-center text-primary-600 bg-accent">
//        <div>
//         <p className="pr-3" title="githubId">{user?.githubId}</p>
//       </div>
//       <div className="flex items-center">
//       <Avatar url={user?.profileUrl} width={30} height={30}/>
//         <p className="pl-3" title="fullname">{user?.fullname}</p>
//       </div>
    
//       <div>
//         <p className="pl-3" title="username">@{user?.username}</p>
//       </div>
//       <div>
//         <p className="pl-3" title="email">{user && user.email ? user.email : 'no email'}</p>
//       </div>
//       <div>
//         <p className="pl-3" title="admin">{user && user.isAdmin ? 'Yes' : 'No'}</p>
//       </div>
//     </div>
//   )
// }


const DataTable = ({adminId, ...props})=>{
  const [users, setUsers] = useState([])
  const router = useRouter()
  const {id} = router.query
  const {addUser,updateUser} = useUserStore()
  const [filter, setFilter] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const {data, error} = useSWR(`http://localhost:4001/api/v1/users/admin/allusers/${id}`, fetcher)
 



  useEffect(()=>{
    if(data){
      setUsers(data.users)
      setIsLoading(false)
    }
  },[data])
  let main = null
  if(isLoading && !data){
    
    main = (
      <Spinner key="spinner_anm"/>
    )
  }
  if(!isLoading && data&& data.users.length == 0){
   
    main = (
      <p key="no_data" className="p-3">There&apos;s no users at the moment...</p>
    )
  }
  if(!isLoading && data&&data.users.length > 0){

    main  = (
      <div key="users_data">
      <table className="w-full relative" id="table-users">
      <thead>
        <tr className="bg-primary-100 text-primary-600">
        <th>Github ID</th>
        <th>Fullname</th>
        <th>Username</th>
        <th>Email</th>
        <th>APIKey</th>
        <th>Admin</th>
        <th>Creator</th>
        <th>Current Activity</th>
        <th>IP Address</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
        {data.users.map((u)=>{
        return (
          <tr 
          onClick={()=>{
            addUser(u)
            openUserModal(true)
            
          }}
           key={u.id} title="click for more">
          <td>{u.githubId}</td>
          <td>{u.fullname}</td>
          <td>{u.username}</td>
          <td>{u.email? u.email : 'No email' }</td>
          <td>{u.APIKey ? u.APIKey : 'No APIKey'}</td>
          <td>{u.isAdmin ? 'Yes' : 'No'}</td>
          <td>{u.isCreator ? 'Yes' : 'No'}</td>
          <td>{u.currentActivity ? u.currentActivity : 'No activity'}</td>
          <td>{u.ip ? u.ip : 'No IP'}</td>
          <td>{moment(u.insertedAt).format("LL")}</td>
          </tr>
        )
      })}
      
      </tbody>
      </table>
    
    </div>
    )
  }

  return (
    <div 
    style={{  backgroundColor:"rgba(255,255,255,0.8)", color:"#000"}}
    className="w-full h-full relative">
      {filter.length == 0 ? (
        <div>
          {main}
          </div>
      ): (
<div>
  <p>filtering users..</p>
</div>
      )}
      
    </div>
  )

}


export default DataTable