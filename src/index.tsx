import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./containers/home/screen";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}



const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(<App />);


