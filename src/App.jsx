import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Nav from "./components/Nav";
import ErrorPage from "./components/ErrorPage";
import "./styles/custom.scss";
import Detail from "./components/Detail";
import Footer from "./components/Footer";
import Results from "./components/Results";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/results/:searchKeyword" element={<Results />} />
      </Routes>
      <Footer />
    </>
  );
}
