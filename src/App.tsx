// import { ThemeProvider } from '@mui/material/styles';
// import { Provider } from 'react-redux';
// import './App.css';
// import Store from './Redux/store';
// import theme from './Theme';
// import Client from './components/client/Client';
// import MainRouter from './components/router/MainRouter';
// import React, { Suspense, useEffect, useState } from 'react';
// import {  Route, Routes, useLocation } from 'react-router-dom';
// import { useAppSelector } from './Redux/hooks';
// import ErrorToast, { showErrorToast } from './components/generic/errorMassage';
// import  Login from './components/Login/login';

// const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));
// const LazyBaseDetailsManager = React.lazy(() => import('./components/createBusiness/baseDetailsManager'));
// const LazyEmailVerification = React.lazy(() => import('./components/createBusiness/emailVerification'));
// const LazyMoreDetailsManager = React.lazy(() => import('./components/createBusiness/moreDetailsManager'));
// const LazyClient = React.lazy(() => import('./components/client/Client'));



// const App = () => {
//   const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
//   const [typeUser, setTypeUser] = useState<any | null>(null);
//   const [lastInvalidPath, setLastInvalidPath] = useState<string | null>(null);
//   const location = useLocation();

//   useEffect(() => {
//     if (currentUser) {
//       const type = currentUser.employeeDetails.role.type;
//       setTypeUser(type);
//     }
//   }, [currentUser]);

//   const ErrorToastRoute = () => {
    
//     useEffect(() => {
//       if (location.pathname !== lastInvalidPath) {
//         showErrorToast('הדף שאת/ה מחפש/ת אינו נמצא route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**');
//         setLastInvalidPath(location.pathname);
//       }
//     }, [location, lastInvalidPath]);
//     return null;
//   };

//   const isRootPath = location.pathname === '/';

//   return (
//     <ThemeProvider theme={theme}>
//       <Provider store={Store}>
//          <Client />
//         <ErrorToast />
//         <Routes>
//           <Route path="/editProfile" element={<Suspense fallback="Loading..."><LazyEditProfile /></Suspense>} />
//           <Route path="/editProfile" element={<Suspense fallback="Loading..."><LazyEditProfile /></Suspense>} />
//           <Route path="/CreateBusiness/BaseDetailsManager" element={<Suspense fallback="Loading..."><LazyBaseDetailsManager /></Suspense>} />
//           <Route path="/CreateBusiness/EmailVerification" element={<Suspense fallback="Loading..."><LazyEmailVerification /></Suspense>} />
//           <Route path="/CreateBusiness/MoreDetailsManager" element={<Suspense fallback="Loading..."><LazyMoreDetailsManager /></Suspense>} />
//           <Route path="/link/:linkUID" element={<Suspense fallback="Loading..."><LazyClient /></Suspense>} />
//         </Routes>
//         {isRootPath && (
//           <>
//             {typeUser !== 'manager' && typeUser !== 'admin' && typeUser !== '' && typeUser !== undefined && typeUser !== null ? (
//               <Client />
//             ) : typeUser === 'manager' || typeUser === 'admin' ? (
//               <>
//                 <MainRouter />
//               </>
//             ) : (
//               // 
//               <Login/>
//               // <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
//             )}
//           </>
//         )}
//       </Provider>
//     </ThemeProvider>
//   );
// }
// export default App;


import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import './App.css';
import Store from './Redux/store';
import theme from './Theme';
import AuthMenu from './auth0/AuthMenu';
import Client from './components/client/Client';
import MainRouter from './components/router/MainRouter';
import React, { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
import EmailVerification from './components/createBusiness/emailVerification';
import MoreDetailsManager from './components/createBusiness/moreDetailsManager';
import { useAppSelector } from './Redux/hooks';
import ErrorToast, { showErrorToast } from './components/generic/errorMassage';
import WorkersTopNav from './components/navigation/Workers';
import ItemDetailToWorker from './modules/workers/components/itemDetailToWorker';
import MessageList from './modules/workers/components/messageList';
import SidebarWorkerDetails from './modules/workers/components/sidebar_bacik_personal_details';
import WorkersShowList from './modules/workers/components/workersShowList';
import WorkerPage from './modules/workers/components/workerPage';
import User from './modules/workers/classes/user';
import Employee from './modules/workers/classes/employee';
import DeleteTask from './modules/workers/components/tasks/deleteTask';
import EditTask from './modules/workers/components/tasks/editTask';
import { Search } from '@mui/icons-material';
import TaskPage from './modules/workers/components/tasks/taskPage';
import SearchTask from './modules/workers/components/tasks/searchTask';
import Task from './modules/workers/classes/task';
import FilterAndSortTask from './modules/workers/components/tasks/filterAndSortTask';
import TasksShowList from './modules/workers/components/tasks/tasksShowList';
import AddTaskBtn from './modules/workers/components/tasks/createTaskBtn';
import { TaskStatus } from './modules/workers/classes/enum/taskStatus.enum';
const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));

const App = () => {
  const currentUser = useAppSelector((state) => state.currentUserSlice.CurrentUser);
  const [typeUser, setTypeUser] = useState<any | null>(null);
  const [lastInvalidPath, setLastInvalidPath] = useState<string | null>(null);
  const location = useLocation();
  const tasks = useAppSelector((state) => state.taskSlice);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    if (currentUser) {
      const type = currentUser.employeeDetails.role.type;
      setTypeUser(type);
    }
  }, [currentUser]);

  const ErrorToastRoute = () => {
    useEffect(() => {
      if (location.pathname !== lastInvalidPath) {
        showErrorToast('הדף שאת/ה מחפש/ת אינו נמצא route-הכנס/י ב http://localhost:0000/link/**של עסק linkUID**');
        setLastInvalidPath(location.pathname);
      }
    }, [location, lastInvalidPath]);
    return null;
  };

  const isRootPath = location.pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <Provider store={Store}>
        <AuthMenu />
        <ErrorToast />
        <Routes>
          {/* ///////מכאן הקומפוננטות של העובדים///////*/}
          {/* 1-4: שגיאות */}
          {/* ב-5 יש שגיאה כי לא זימנו נכון */}
          <Route path="/1" element={<ItemDetailToWorker item={undefined} column={[]} />}/>
          <Route path="/2" element={<WorkersShowList />} />
          <Route path="/3" element={<AddTaskBtn />} />
          <Route path="/4" element={<TaskPage />} />
          <Route path="/5" element={<FilterAndSortTask filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />} />

          {/* מכאן הכל עובד */}
          <Route path="/6" element={<WorkersTopNav />} />
          <Route path="/messages" element={<MessageList messages={[]} />} />
          <Route path="/details" element={<WorkerPage user={new User()} employee={new Employee()} />} />
          <Route path="/tasks" element={<TasksShowList filteredTasks={filteredTasks} setFilteredTasks={setFilteredTasks} />} />
          <Route path="/7" element={<SidebarWorkerDetails />} />
          <Route path="/8" element={<DeleteTask taskId={''} />} />
          <Route path="/9" element={
            <EditTask
              status={TaskStatus.Completed}
              taskId="123"
              description="Task description"
              taskName="Task name"
              targetDate={new Date()}
              employee={["employee1", "employee2"]}
            />
          } />
          <Route path="/10" element={
            <SearchTask
              tasks={[]}
              setFilteredTasks={setFilteredTasks}
            />
          } />
          <Route path="/11" element={<MainRouter />} />

          {/* ///////////עד פה הקומפוננטות של העובדים/////////// */}
          <Route path="/editProfile" element={<Suspense fallback="Loading..."><LazyEditProfile /></Suspense>} />
          <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
          <Route path="/CreateBusiness/EmailVerification" element={<EmailVerification />} />
          <Route path="/CreateBusiness/MoreDetailsManager" element={<MoreDetailsManager />} />
          <Route path="/link/:linkUID" element={<Client />} />
          <Route path="/:any/*" element={<ErrorToastRoute />} />
        </Routes>
        {isRootPath && (
          <>
            {typeUser !== 'manager' && typeUser !== 'admin' && typeUser !== '' && typeUser !== undefined && typeUser !== null ? (
              <Client />
            ) : typeUser === 'manager' || typeUser === 'admin' ? (
              <MainRouter />
            ) : (
              <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
            )}
          </>
        )}
      </Provider>
    </ThemeProvider>
  );
};

export default App;
