import React from 'react'
import Link from './link-routes/Link'

const Header = () => {
    return (
        <div className = "ui secondary pointing menu" style = {{display : "flex", justifyContent : "center", color : "#eae6eb"}}>
            <Link href="/" className = "item">Accordion</Link>
            <Link href="/search" className = "item">Search Wiki</Link>
            <Link href="/dropdown" className = "item">Dropdown Menu</Link>
            <Link href="/translate" className = "item">Google Translator</Link>  
        </div>
    )
}

export default Header
