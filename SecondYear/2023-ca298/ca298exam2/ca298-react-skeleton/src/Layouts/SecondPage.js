import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function SecondPage(){
    return (
        <div>
            <p>This is a second page.</p>
            <p>Click <Link to="/">here</Link> to return to the homepage</p>
        </div>
    )
}