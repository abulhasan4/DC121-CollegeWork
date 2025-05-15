import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function HomePage(){
    return (
        <div>
            <p>This is the default homepage</p>
           <p>Click <Link to="secondpage">here</Link> to visit a second page</p>
        </div>
    )
}