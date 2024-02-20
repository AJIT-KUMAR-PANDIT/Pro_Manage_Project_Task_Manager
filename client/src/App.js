import RegisterLogin from './Pages/RegisterLogin/RegisterLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Public from './Pages/Public/Public';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/public" element={<Public />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
