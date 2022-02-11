import spinner from '/Users/gurleenkaur/Desktop/Team6/src/assets/spinner.svg';
import logo from '/Users/gurleenkaur/Desktop/Team6/src/assets/roadmap.jpg';
import '/Users/gurleenkaur/Desktop/Team6/src/App.css';
import Header from '/Users/gurleenkaur/Desktop/Team6/src/components/Header.js';
import '/Users/gurleenkaur/Desktop/Team6/src/App.css';

function Home() {
  window.onload = function(){
    setInterval(function(){
        // alert("Hello");
    }, 5000);
 };
  return (
    <div className="App">
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Quintessential&display=swap');
      </style>
      <Header/>
      <header className="App-header">
        <p>Welcome to Roadmap</p>
        <img src={spinner} width="15%" className="spinner" alt="logo" />
        <img src={logo} height="auto"/>
        <p1>Set your education path ...</p1>ß
      </header>
    </div>
  );
}

export default Home;




// import React from "react";

// function Home() {
//   return (
//     <div className="home">
//       <div class="container">
//         <div class="row align-items-center my-5">
//           <div class="col-lg-7">
//             <img
//               class="img-fluid rounded mb-4 mb-lg-0"
//               src="http://placehold.it/900x400"
//               alt=""
//             />
//           </div>
//           <div class="col-lg-5">
//             <h1 class="font-weight-light">Home</h1>
//             <p>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s, when an unknown printer took a galley of
//               type and scrambled it to make a type specimen book.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;