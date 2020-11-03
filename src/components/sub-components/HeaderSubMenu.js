import React from 'react';

function HeaderSubMenu ({ display, userEmail }) {
  const id = display ? "display" : "hidden"; 
  return (
    <section id={ id } className='slide-menu'>
      SubMenu 
    </section>
  )
}

export default HeaderSubMenu;