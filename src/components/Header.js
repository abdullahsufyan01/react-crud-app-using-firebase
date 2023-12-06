import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/add', label: 'Add User' },
  // { path: '/update/:id', label: 'Update User' },
  // { path: '/view', label: 'View User List' },
  { path: '/about', label: 'About' },
];

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    const currentTab = navItems.find(item => location.pathname === item.path)?.label || 'Home';
    setActiveTab(currentTab);
  }, [location]);
  

  return (
    <header>
      <div className="container">
        <div className="nav-bar-wrap">
          <div className="logo">
            <Link to='/'>CRUD</Link>
          </div>
          <div className="nav-bar">
            <nav>
              <ul>
                {navItems.map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.path}
                      className={activeTab === item.label ? 'active' : ''}
                      onClick={() => setActiveTab(item.label)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
