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
      name: "Lifestyle & Health",
      icon: <HeartHalfFilled width={22} height={22} />,
      to: "/discovery/lifestyle-health",
      color: "#0088FE",
      size: 400
    },
  
    {
      name: "Arts & Entertainments",
      icon: <PaintBrush width={22} height={22} />,
      to: "/discovery/arts-entertainments",
      color: "#00C49F",
      size: 300

    },
    {
      name: "News & Politics",
      icon: <NewsPaper width={26} height={26} />,
      to: "/discovery/news-politics",
      color:"#FFBB28",
      size: 300

    },
    {
      name: "Sports",
      icon: <Football width={26} height={26} />,
      to: "/discovery/sports",
      color: "#FF8042",
      size: 300

    },
    {
      name: "Business & Technology",
      icon: <PersonAtCounter width={26} height={26} />,
      to: "/discovery/business-technology",
      color: "#fa617d",
      size: 100

    },
  ];



  export default Categories