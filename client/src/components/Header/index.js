import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Auth from '../../utils/auth';
import '../../assets/css/style.css';


const Header = () => {
  
  // const [ scrolled, setScrolled ] = React.useState(false);

  // const handleScroll = () => {
  //   const offset = window.scrollY;

  //   if (offset > 300 ) {
  //     setScrolled(true);
  //   }
  //   else {
  //     setScrolled(false);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  // })

  // let stickyclass = ['header'];

  // if (scrolled) {
  //   stickyclass.push('scrolled');
  // }

  return (

          <Navbar/>


		// <header id="header">
		// 	<nav className="navbar navbar-expand-sm navbar-dark">
		// 		<div className="container-fluid">
		// 			<a className="navbar-brand" href="#">Logo</a>
    //       <Navibar/>
		// 		</div>
		// 	</nav>
		// </header>
  );
};

export default Header;