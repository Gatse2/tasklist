import './App.css';
import AddTask from './AddTask';

function App() {
  return (
    <div className="App">
        <header>
          <h1>ToDo List</h1>
        </header>
        <main>
          <AddTask/>
        </main>     
    </div>
  );
}

export default App;
