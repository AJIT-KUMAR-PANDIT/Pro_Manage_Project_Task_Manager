import RegisterLogin from './Pages/RegisterLogin/RegisterLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Public from './Pages/Public/Public';
import { useParams } from 'react-router-dom';
import NotFound from './Components/Dashboard/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/public/sharedtasklink/:taskId"
          element={<PublicWithTaskId />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


function PublicWithTaskId() {
  let { taskId } = useParams();

  return <Public taskId={taskId} />;
}
