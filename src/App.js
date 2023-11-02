import Login from './Page/Login'
import FormNNN from './Page/FormNNN';
import Stat from './Page/Stat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <div className="App" style={{margin: 0, height: '100%'}}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/daily-survey' element={<FormNNN />}></Route>
            <Route path='/stat' element={<Stat />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
