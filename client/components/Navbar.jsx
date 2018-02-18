import React from 'react'
import { NavLink, withRouter } from "react-router-dom"

export default () => {
	return (
		<nav className="nav">
				<h1><em>BEERMAN BOX</em><img className="coin" src={'./assets/coinBig.png'} /></h1>
		</nav>
	)
}

{/*<NavLink to={'/ranktop'} className="navbar-link">Top</NavLink>
								<NavLink to={'/ranknew'} className="navbar-link">New</NavLink>
								<NavLink to={'/rankfame'} className="navbar-link">Fame</NavLink>
								<NavLink to={'/rankstate'} className="navbar-link">State</NavLink>
								<NavLink to={'/'} className="navbar-brand">Beer</NavLink>
								<NavLink to={'/styles'} className="navbar-link">Style</NavLink>*/}