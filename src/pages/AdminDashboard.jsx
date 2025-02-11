import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiBook, FiSettings, FiLogOut, FiGrid } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AlumniManagement from '../components/AlumniManagement';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';

const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #2A0845 0%, #1B1464 100%);
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.h1`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const MenuItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: white;
  cursor: pointer;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  transition: background 0.3s ease;
  
  ${props => props.active && `
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  svg {
    margin-right: 0.8rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://res.cloudinary.com/dqt4zammn/image/upload/b_rgb:290846/v1739207877/work-concept-illustration_knzqlh.png') no-repeat center center;
    background-size: cover;
    opacity: 0.1;
    z-index: -1;
  }
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('alumni');
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'alumni':
        return <AlumniManagement />;
      case 'users':
        return <div>Users Management</div>;
      case 'resources':
        return <div>Resources Management</div>;
      case 'settings':
        return <div>Settings</div>;
      default:
        return <AlumniManagement />;
    }
  };

  return (
    <PageTransition isLoading={loading}>
      <LoadingScreen message="Loading dashboard" />
      <DashboardContainer>
        <Sidebar>
          <Logo>KIITWALLAH Admin</Logo>
          
          <MenuItem
            active={activeSection === 'alumni'}
            onClick={() => setActiveSection('alumni')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiGrid />
            Alumni Nexus
          </MenuItem>

          <MenuItem
            active={activeSection === 'users'}
            onClick={() => setActiveSection('users')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiUsers />
            Users
          </MenuItem>

          <MenuItem
            active={activeSection === 'resources'}
            onClick={() => setActiveSection('resources')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiBook />
            Resources
          </MenuItem>

          <MenuItem
            active={activeSection === 'settings'}
            onClick={() => setActiveSection('settings')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiSettings />
            Settings
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ marginTop: 'auto' }}
          >
            <FiLogOut />
            Logout
          </MenuItem>
        </Sidebar>

        <MainContent>
          {renderContent()}
        </MainContent>
      </DashboardContainer>
    </PageTransition>
  );
};

export default AdminDashboard; 