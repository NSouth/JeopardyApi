import { Outlet, Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import '../App.css';
import '../index.css';

function Layout() {
  return (
    <div className="flex">
    <Sidebar breakPoint="sm">
        <Menu>
            <MenuItem routerLink={<Link to="/" />}> Home</MenuItem>
            <MenuItem routerLink={<Link to="/about" />}> About</MenuItem>
        </Menu>
    </Sidebar>
    <main className="w-full">
        <div className="App">
        <header className="App-header">
            <h1 className='jeopardy-font'>Jeopardy Clues!</h1>
        </header>
        <div style={{marginTop: '20px'}}>
            <Outlet />
        </div>
        </div>

    </main>

    </div>
  )
};

export default Layout;