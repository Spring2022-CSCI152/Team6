import './LogIn.css';
import Header from '../components/Header';
import { Link } from 'react-router-dom';



function CoursesParser() {
  return (
      <div className="App">
        <Header />
        <div className='Parser'>
            <div className='LogIn-Box'>
                <p id="title">Courses Parser</p>
                <form>
                    <label for="fname">Select Catalog Courses PDF</label>
                    <input type="file" />
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default CoursesParser;
