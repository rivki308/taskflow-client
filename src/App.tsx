
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import EmployeesPage from './pages/EmployeesPage';
import ProjectsPage from './pages/ProjectsPage';
import NotFoundPage from './pages/NotFoundPage';
import TaskFormPage from './pages/TaskFormPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Footer from './ui/Footer';


function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
                <Route path="/tasks/new" element={<AdminRoute><TaskFormPage /></AdminRoute>} />
                <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetailsPage /></ProtectedRoute>} />
                <Route path="/tasks/:id/edit" element={<AdminRoute><TaskFormPage /></AdminRoute>} />
                <Route path="/employees" element={<AdminRoute><EmployeesPage /></AdminRoute>} />
                <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
