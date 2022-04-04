import '../LogIn.css';//temporary css use
import Header from '../../components/Header';


function CoursesParser() {
  return (
      <div className="App">
        <Header />
        <div className='Parser'>
            <div className='LogIn-Box'>
                <p id="title">Courses Parser</p>
                <form>
                    <label for="pdfName">Select Catalog Courses PDF</label>
                    <input type="file" id="pdfName"/>
                </form>
            </div>
        </div>
      </div>
    
  );
}

export default CoursesParser;
