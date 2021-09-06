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
    },
  
    {
      name: "Arts & Entertainments",
      icon: <PaintBrush width={22} height={22} />,
      to: "/discovery/arts-entertainments",
    },
    {
      name: "News & Politics",
      icon: <NewsPaper width={26} height={26} />,
      to: "/discovery/news-politics",
    },
    {
      name: "Sports",
      icon: <Football width={26} height={26} />,
      to: "/discovery/sports",
    },
    {
      name: "Business & Technology",
      icon: <PersonAtCounter width={26} height={26} />,
      to: "/discovery/business-technology",
    },
  ];



  export default Categories