
import {Chart, UsersData, Admin} from "../icons";

const AdminNav = [
 {
   label: "Dashboard",
   icon: <Chart width={20} height={20} />,
   to: "/admin",
 },
 {
   label: "Users Data",
   icon: <UsersData width={20} height={20} />,
   to: "/admin/users",
 },
];


export default AdminNav
