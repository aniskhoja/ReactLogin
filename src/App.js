import './App.css';
import LoginForm from './Components/LoginForm';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Components/Register';
import TokenValidation from './Components/TokenValidation';
import EmailValidation from './Components/EmailValidation';
import ForgetPass from './Components/ForgetPass';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ForgetPass />} />
          <Route path="/reset/:token" element={<ForgetPass />} />
          <Route path="/validation" element={<EmailValidation />} />
          <Route path="/validation/:token" element={<TokenValidation />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;
