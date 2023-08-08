import './App.css';
import NavBar from './components/NavBar/NavBar'
import Mode from './components/Mode/Mode';

function App() {
  return (
    <div className='bg-success-subtle bg-gradient fullHeight'>
      <NavBar/>
      <Mode />
    </div>
  );
}

export default App;
