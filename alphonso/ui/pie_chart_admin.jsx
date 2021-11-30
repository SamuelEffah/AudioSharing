import React from "react"
import ChartCardOverlay from "./chart_card_overlay"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
// import Categories from "../data/categories";


const PieLegendItem = ({category,...props})=>{
    return (
        <div className="w-full relative flex items-center pb-1">
            <div 
            style={{backgroundColor: category?.color}}
            className="w-3 h-3 rounded-sm bg-accent mr-1.5"/>
            <div>
                <p className="text-sm">{category.name}</p>
            </div>
        </div>
    )
}

const PieChartAdmin = ({size,categories,...props})=>{


    return (
        <ChartCardOverlay 
        title="Podcast Categories"
        size={size}>
<PieChart width={360} height={170} >
        <Pie
          data={categories}
          cx={140}
          cy={80}
          innerRadius={70}
          outerRadius={80}
          stroke="#18191C"
          paddingAngle={5}
          dataKey="size"
        >
          {categories?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color}/>
          ))}
        </Pie>
    </PieChart>
        <div className="">
        {categories?.map((entry, index) => (
              <PieLegendItem key={`pie-legend-${index}`} 
              category={entry}
               />
          ))}
        </div>
    </ChartCardOverlay>
    )
}


export default PieChartAdmin