// import { ThemeProvider } from '@mui/material/styles';
// import { Provider } from 'react-redux';
// import './App.css';
// import Store from './Redux/store';
// import theme from './Theme';
// import AuthMenu from './auth0/AuthMenu';
// import Client from './components/client/Client';
// import MainRouter from './components/router/MainRouter';
// import React, { Suspense, useEffect, useState } from 'react';
// import { Link, Route, Routes, useLocation } from 'react-router-dom';
// import BaseDetailsManager from './components/createBusiness/baseDetailsManager';
// import EmailVerification from './components/createBusiness/emailVerification';
// import MoreDetailsManager from './components/createBusiness/moreDetailsManager';
// import { useAppSelector } from './Redux/hooks';
// import ErrorToast, { showErrorToast } from './components/generic/errorMassage';
// import  Login from './components/Login/login';

// const LazyEditProfile = React.lazy(() => import('./auth0/editProfile'));

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
//           <Route path="/CreateBusiness/BaseDetailsManager" element={<BaseDetailsManager />} />
//           <Route path="/CreateBusiness/EmailVerification" element={<EmailVerification />} />
//           <Route path="/CreateBusiness/MoreDetailsManager" element={<MoreDetailsManager />} />
//           <Route path="/link/:linkUID" element={<Client />} />
//           <Route path="/:any/*" element={<ErrorToastRoute />} />
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
    <>
      <ThemeProvider theme={theme}>
        <Provider store={Store}>
          <AuthMenu />
          <ErrorToast />
          <Routes>

          {/* קומפוננטות 1-4 עובדות נפלא */}
          {/* שגיאת טייפסקירפט */}
          <Route path="/1" element={<ItemDetailToWorker item={undefined} column={[]} />}/>
          <Route path="/2" element={<MessageList messages={[]} />}/>
          <Route path="/3" element={<SidebarWorkerDetails/>}/>
          <Route path="/4" element={<WorkerPage user={new User} employee={new Employee} />}/>

          {/* //דף לבן עם כמה שגיאות */}
          <Route path="/details" element={<WorkersShowList />}/>

          {/* הנאב נפתח אבל כשלוחצים על כל דבר עושה שהניתוב לא נכון */}
            <Route path="/6" element={<WorkersTopNav />}/>

            <Route path="/7" element={<AddTaskBtn />}/>
            <Route path="/8" element={<DeleteTask taskId={''} />}/>
            <Route path="/9" element={<EditTask
                status={TaskStatus.Completed} 
                taskId="123" 
                description="Task description" 
                taskName="Task name" 
                targetDate={new Date()} 
                employee={["employee1", "employee2"]} 
             />}/>
            <Route path="/10" element={<FilterAndSortTask filteredTasks={[]} setFilteredTasks={function (value: React.SetStateAction<Task[]>): void {
              throw new Error('Function not implemented.');
            } } />}/>
            <Route path="/11" element={<SearchTask tasks={[]} setFilteredTasks={function (value: React.SetStateAction<Task[]>): void {
              throw new Error('Function not implemented.');
            } } />}/>
            <Route path="/tasks" element={<TaskPage />}/>
            <Route path="/13" element={<TasksShowList filteredTasks={[]} setFilteredTasks={function (value: React.SetStateAction<Task[]>): void {
              throw new Error('Function not implemented.');
            } } />}/>

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
                <>
                  <MainRouter />
                </>
              ) : (
                <Link to={'/CreateBusiness/BaseDetailsManager'}>הרשמה של עסק</Link>
              )}
            </>
          )}
        </Provider>
      </ThemeProvider>
    </>);
}
export default App;