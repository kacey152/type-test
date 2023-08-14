import './App.css';
import NavBar from './components/NavBar/NavBar'
import Mode from './components/Mode/Mode';
import WordPrompt from './components/WordPrompt/WordPrompt';

function App() {
  return (
    <div className='bg-success-subtle bg-gradient fullHeight'>
      <NavBar/>
      <Mode />
      <WordPrompt time='30'/>
    </div>
  );
}

export default App;
