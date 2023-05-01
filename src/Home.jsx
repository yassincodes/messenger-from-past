import Header from "./sections/Header";
import Body from "./sections/Body";

function Home() {
  return (
    <div className="top-content">
    <div className="content-wrapper">
      <div className="card-wrapper">
       <Header />
       <Body />
      </div>
    </div>
  </div>
  )
}

export default Home