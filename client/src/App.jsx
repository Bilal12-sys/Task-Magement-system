import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Shell from './components/layout/Shell';
import CinematicIntro from './components/intro/CinematicIntro';

// Pages
import DashboardPage from './pages/DashboardPage';
import MyTasksPage from './pages/MyTasksPage';
import AiPlannerPage from './pages/AiPlannerPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

export default function App() {
  // Intro plays once per page load / refresh, but does NOT replay on route navigation
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BrowserRouter>
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <TaskProvider>
        <Shell>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasks" element={<MyTasksPage />} />
            <Route path="/planner" element={<AiPlannerPage />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
            <Route path="/tasks/:id" element={<TaskDetailsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Shell>
      </TaskProvider>
    </BrowserRouter>
  );
}
