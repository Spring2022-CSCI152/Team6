import '../../CSS/LogIn.css';//temporary css use


function CoursesParser() {
  return (
      <div className="App">
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
