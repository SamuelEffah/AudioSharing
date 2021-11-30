import React,{useContext,useState, useEffect} from "react"
import Link from "next/link"
import {useRouter}  from "next/router"
import Image from "next/image"
import ControllerOverlay from "../../shared-components/controller_overlay";
import InfoCard from "../../ui/info_card";
import Avatar from "../../ui/avatar";
import {Spinner} from "../../icons";
import LineChartAdmin from "../../ui/line_chart";
import PieChartAdmin from "../../ui/pie_chart_admin";
import AdminNavigation from "../../data/admin_nav"
import {NavItem} from "../../ui/side_bar_panel"
import { WSContext } from "../../modules/ws/ws_provider";
import axios from "axios";
import useSWR from 'swr'
import DataTable from "../../ui/data_table";
import UserModal from "../../shared-components/modal/user_modal";
const fetcher = (url)=> axios.get(url).then((res)=>res.data)



const ReportBoard = ({reports, isLoading})=>{

  let main = null
  if(isLoading){
    main = (
      <Spinner/>
    )
  }
  if(!isLoading && reports&& reports.length == 0){
    main = (
      <p className="p-3">There&apos;s no reports at the moment...</p>
    )
  }
  if(!isLoading && reports&&reports.length > 0){
    main  = (
      <div>
      {reports.map((r)=>{
        return <Item report={r} key={r.id}/>
      })}
    </div>
    )
  }
  const Item = ({report})=>{
    return (
      <div>
       <p>report.msg</p>
      </div>
    )
  }
return(
  <div 
  style={{width:"calc(100% - 600px)", backgroundColor:"rgba(255,255,255,0.8)", color:"#000"}}
  className="ml-5 relative w-full rounded-xl">
    <h4 className="text-xl ml-3 mb-3  mt-2">Reports</h4>
    {main}
  </div>
)

}


const AdminPanel = ({...props})=>{
  const router = useRouter()
  const {user,setUser} = useContext(WSContext)
  const {id} = router.query
  const [isLoading, setIsLoading] = useState(true)
  const {data, error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/admin/${id}`, fetcher)
  
  if(data){
    
    setUser(data.user)
  }

  useEffect(()=>{
    if(data){
      setIsLoading(false)
    }
  },[data])
  //  useEffect(()=>{
  //   if(id){
  //     const getAdmin = async()=>{
  //       const ENDPOINT = `http://localhost:4001/api/v1/users/admin/${id}`
  //       console.log("end ", ENDPOINT)
  //       await axios.get(ENDPOINT)
  //       .then((e)=>{
  //         console.log(e.data)

  //         if(e.data && e.data.user && e.data.user.length > 0){
  //           console.log(e.data)
  //           setUser(e.data.user)
  //           adminVerify
  //         }
  //       })
  //     }

  //     getAdmin()
  //   }

  //  },[id,setUser,stats])
    return (
        <div 

          className="w-full h-full relative text-primary-600 overflow-y-auto">
            <div 
            style={{height: "40px"}}
            className=" bg-primary-100 flex justify-between items-center py-6 px-5">
              <div>
              <Link href="/discovery">
                <a>Go Back</a>
              </Link>

              </div>
              <div>
                <h4>Podcast</h4>
              </div>
              <div>
              {user ? (
                 
                 <Avatar url={user?.profileUrl} />

              ) : null}
              </div>
           
            </div>
            <div 
              className="relative flex flex-col pt-6 items-center "
              style={{height: "calc(100% - 46px)"}}>
                <div className="flex">
                <InfoCard 
                number={data?.stats?.numOfUsers}
              desc="Number of Users"
              color="#7442c9"
                />
                <InfoCard
                  number={data?.stats?.numOfPod}
                  desc="Number of Podcasts"
              color="#526ecc"
            />
              <InfoCard
                  number={data?.stats?.numOfReports}
                  desc="Number of Reports"
              color="#526ecc"
            />
                </div>

                <div className="flex mt-6 justify-center w-10/12 " >
                 <PieChartAdmin 
                 categories={data?.categories}
                 size="sm"/>

                <ReportBoard reports={data?.reports} isLoading={isLoading}/>
                </div>

                <div
                style={{height: "600px"}}
                 className="relative mt-14  w-10/12">
                <DataTable adminId={id}/>
                </div>
           
              </div>
              <UserModal/>
        </div>
    )
}


export default AdminPanel



// <AdminSideBar/>
         
// <ControllerOverlay>
// <div  className="w-full relative">

// <div className="w-full  my-4 mb-5 flex flex-wrap">
//     <InfoCard
//         number={1503}
//         desc="current active users"

//     />
//     <InfoCard
//         number={2303}
//         desc="Last 7 days of new users"
//         color="#7442c9"

//     />
//     <InfoCard
//         number={5432}
//         desc="Last 7 days of new podcast"
//         color="#526ecc"

//     />
// </div>

// <LineChartAdmin size="full"/>
// <PieChartAdmin size="md"/>

// </div>
    
// </ControllerOverlay>