import RegisterLogin from './Pages/RegisterLogin/RegisterLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Public from './Pages/Public/Public';
import { useParams } from 'react-router-dom';
import NotFound from './Components/Dashboard/NotFound/NotFound';
import { useSelector } from 'react-redux';

function App() {
  const loader = 'Assets/loader.gif';
  const isLoaderToggle = useSelector(state => state.loaderAction.loader);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/public/sharedtasklink/:taskId"
            element={<PublicWithTaskId />}
          />
          <Route
            path="/public/sharedtasklink/:taskId/*"
            element={<NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {isLoaderToggle && (
        <img src={loader} alt="loader" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '111px' }} />
      )}
    </>
  );
}

export default App;


function PublicWithTaskId() {
  let { taskId } = useParams();

  return <Public taskId={taskId} />;
}
