import React from "react"
import ReactDOM  from "react-dom/client"
// Component file
import TodoContainer from "./functionBased/components/TodoContainer";
import About from "./functionBased/pages/About"
import NotMatch from "./functionBased/pages/NotMatch"
import Navbar from "./functionBased/components/Navbar";
//Stylesheet
import "./functionBased/App.css"
//React router dom
import { HashRouter, Route, Routes } from "react-router-dom";




var root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    //Wrapping component in strictMode gives an error detection scheme over the components.
    <React.StrictMode>
        <HashRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<TodoContainer />}/>
                <Route path="/about/*" element={<About/>}/>
                <Route path="*" element={<NotMatch/>}/>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);