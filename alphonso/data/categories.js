import {
HeartHalfFilled,
PaintBrush,
NewsPaper,
Football,
PersonAtCounter
}
from "../icons"

const Categories = [
    {
      name: "lifestyle & health",
      icon: <HeartHalfFilled width={22} height={22} />,
      to: "/discovery/lifestyle-health",
      color: "#0088FE",
      size: 400
    },
  
    {
      name: "art & entertainment",
      icon: <PaintBrush width={22} height={22} />,
      to: "/discovery/art-entertainment",
      color: "#00C49F",
      size: 300

    },
    {
      name: "news & politics",
      icon: <NewsPaper width={26} height={26} />,
      to: "/discovery/news-politics",
      color:"#FFBB28",
      size: 300

    },
    {
      name: "sports",
      icon: <Football width={26} height={26} />,
      to: "/discovery/sports",
      color: "#FF8042",
      size: 300

    },
    {
      name: "business & technology",
      icon: <PersonAtCounter width={26} height={26} />,
      to: "/discovery/business-technology",
      color: "#fa617d",
      size: 100

    },
  ];



  export default Categories