import "../styles.css";
import {useState} from "react"
export default function TableCard({id,name,email,phone,status,date,handleDelete}){
    const [styles,setStyle]=useState("black")
 

    return(
        <>
        <div className="TableBox TableBoxs" >
        <div className="innertablebox name">
          <div className="">{name}</div>
          <div className="dots tooltip">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            
            <div className="tooltiptext">
            <p className="">Update status</p>
            <p className="">Send a message</p>
            <hr/>
            <p>View details</p>
            <p>Edit</p>
            <p>Copy</p>
            <p>Move</p>
            <p>Export</p>
            <hr/>
            <p className="DltBtn" onClick={handleDelete}>Delete</p>
            </div>
            



          </div>
        </div>

        <div>{email}</div>
        <div>{phone}</div>
        <div>{status}</div>
        <div>{date}</div>
      </div>
        </>
    )
}

