import './App.css';
import LoginForm from './Components/LoginForm';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Components/Register';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;
