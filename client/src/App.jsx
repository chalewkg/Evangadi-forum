import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Questions from "./pages/Questions/Questions";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import QuestionAnswers from "./pages/QuestionAnswer/QuestionAnswers";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import "./app.css";
export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  // const token = localStorage.getItem("token");
  const naviaget = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: { Authorization: "Bearer " + token },
      });
      // console.log(data);
      setUser(data);
      setToken(localStorage.getItem("token")); // Set the token after the user is authenticated
    } catch (error) {
      console.log(error.response);
      naviaget("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AppState.Provider value={{ user, setUser, token, setToken }}>
      <Header />
      {/* <Home /> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/ask-questions' element={<AskQuestion />} />
        <Route
          path='/question-answers/:questionId'
          element={<QuestionAnswers />}
        />
      </Routes>
      <Footer />
    </AppState.Provider>
  );
}

export default App;
