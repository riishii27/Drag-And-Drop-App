// import './App.css';
import Dropzone from './Dropzone.js'

function App() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="title pt-4 my-4 fs-2 fw-bold">Upload Files</h1>
        <Dropzone className='p-5 mt-6 border ' />
      </div>
    </section>
  );
}

export default App;
