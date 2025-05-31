"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Navbar from "./components/Landing/NavBar"
import Hero from "./components/Landing/home"
import HowItWorks from "./components/Landing/howItWorks"
import Features from "./components/Landing/feature"
import CallToAction from "./components/Landing/ActionButton"

import Footer from "./components/Landing/footer"
import DashboardLayout from "./components/dashboard/DashboardLayout"
import DashboardHome from "./components/dashboard/DashboardHome"
import MyProjects from "./components/dashboard/MyProject"
import CreateProject from "./components/dashboard/CreateProject"
import ProjectTracker from "./components/dashboard/ProjectTracker"
import TodoList from "./components/dashboard/TodoList"
import Notifications from "./components/dashboard/Notification"
import Analytics from "./components/dashboard/Analytic"
import Settings from "./components/dashboard/Setting";
import { useWallet } from "@suiet/wallet-kit";

// Landing Page Component
const LandingPage: React.FC<{
  isWalletConnected: boolean;
  // onWalletConnect: () => void;
  // onWalletDisconnect: () => void;
}> = ({   }) => {

    const wallet = useWallet();
    const walletAddress = wallet.address || "";
    const isWalletConnected = wallet.connected || false;

  return (
    <>
      <Navbar
        isWalletConnected={wallet?.connected}
        // walletAddress={walletAddress}
        // onWalletConnect={onWalletConnect}
        // onWalletDisconnect={onWalletDisconnect}
      />
      <main className="main-content">
        <Hero isWalletConnected={isWalletConnected} />
        <HowItWorks />
        <Features />
        <CallToAction  isWalletConnected={isWalletConnected} />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  // const [isWalletConnected, setIsWalletConnected] = useState<boolean>(() => {
  //   const saved = localStorage.getItem('isWalletConnected');
  //   return saved ? JSON.parse(saved) : false;
  // });
  

    const wallet = useWallet();
    const walletAddress = wallet.address || "";
    const isWalletConnected = wallet.connected || false;

  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save states to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('isWalletConnected', JSON.stringify(isWalletConnected));
  // }, [isWalletConnected]);

  // useEffect(() => {
  //   localStorage.setItem('walletAddress', walletAddress);
  // }, [walletAddress]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // const handleWalletConnect = () => {
  //   // Simulate wallet connection
  //   setIsWalletConnected(true)
  //   setWalletAddress("0x1234567890abcdef1234567890abcdef12345678")
  // }

  // const handleWalletDisconnect = () => {
  //   setIsWalletConnected(false)
  //   setWalletAddress("")
  //   localStorage.removeItem('isWalletConnected');
  //   localStorage.removeItem('walletAddress');
  // }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <Router>
      <div className={`app ${isDarkMode ? "dark-theme" : ""}`}>
        <Routes>
          {/* Landing Page Route */}
          <Route
            path="/"
            element={
              !isWalletConnected ? (
                <LandingPage
                  isWalletConnected={isWalletConnected}
                />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Home Route (accessible from dashboard) */}
          <Route
            path="/home"
            element={
              <LandingPage
                isWalletConnected={isWalletConnected}

              />
            }
          />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard/*"
            element={
              isWalletConnected ? (
                <DashboardLayout
                  walletAddress={walletAddress}
                  isDarkMode={isDarkMode}
                  onToggleTheme={toggleTheme}
                  
                >
                  <Routes>
                    <Route index element={<DashboardHome />} />
                    <Route path="projects" element={<MyProjects />} />
                    <Route path="create-project" element={<CreateProject />} />
                    <Route path="project/:id" element={<ProjectTracker />} />
                    <Route path="todo" element={<TodoList />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route
                      path="settings"
                      element={
                        <Settings walletAddress={walletAddress} isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
                      }
                    />
                  </Routes>
                </DashboardLayout>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Redirect any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
