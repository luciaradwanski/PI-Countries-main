import React from "react"
import style from './Pagination.modules.css'

export default function Pagination({num, setCurrentPage}){
    return(
        <div className={style.container}>
            <button onClick={() => setCurrentPage(num)}>{num}</button>
        </div>
    )
}