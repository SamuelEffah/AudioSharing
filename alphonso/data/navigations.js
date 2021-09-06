
import { Discovery, Settings, Sound, Favorite } from "../icons";

 const Navigations = [
  {
    label: "Discovery",
    icon: <Discovery width={21} height={21} />,
    to: "/discovery",
  },
  {
    label: "My Podcasts",
    icon: <Sound width={21} height={21} />,
    to: "/my-podcasts",
  },
  {
    label: "Favorites",
    icon: <Favorite width={20} height={20} />,
    to: "/favorites",
  },
  {
    label: "Settings",
    icon: <Settings width={20} height={20} />,
    to: "/settings",
  },
];


export default Navigations



