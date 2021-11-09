import React, {useCallback, useState} from "react"



const Tabs = ({data=[], currentIndx, setCurrentIndx, className, ...props})=>{
    // const [currentIndx, setCurrentIndx] = useState(1);
    const activeClass = 'text-accent-100 '
    const inActiveClass = 'text-primary-300'

    const handleTab = useCallback((indx)=>{
        setCurrentIndx(indx)
    },[setCurrentIndx])

    return (
        <div className="flex items-center mt-3 mb-6">
            {data.map((v,i)=>{
                return (
                    <p
                    style={{marginLeft: `${i != 0 ? '10' : '0' }px`}}
                    onClick={(e)=>{
                        e.preventDefault()
                        handleTab(i)
                    }
                        } 
                    className={`cursor-pointer text-lg ${currentIndx == i ? activeClass : inActiveClass}`}
                    key={i}>
                    {v}
                    </p>
                    )
            })}
        </div>
    )
}



export default Tabs