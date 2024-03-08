
import Navbar from "./components/Navbar";
import {Route,Routes} from "react-router-dom";
import Record from "./components/Record";
import RecordList from "./components/RecordList";

const App = () => {
  return (
    <div className="w-full p-6">
    <Navbar />
   <Routes>
    <Route path="/" element={<RecordList />}/>
    <Route path="/edit/:id" element={<Record />}/>
    <Route path="/create" element={<Record />}/>
   </Routes>
    </div>
  );
};
export default App