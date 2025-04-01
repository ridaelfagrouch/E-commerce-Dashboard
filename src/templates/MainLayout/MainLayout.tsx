import React from 'react';
import SideNavigation from '../../components/organisms/SideNavigation/SideNavigation';
import Header from '../../components/organisms/Header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavigation />
      
      <div className="flex-1 flex flex-col overflow-auto">
        <Header username="Jane Doe" />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;