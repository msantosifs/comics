import {ComicPage} from "./Pages/ComicPage.tsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NotFoundPage} from "./Pages/NotFoundPage.tsx";


function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<ComicPage/>}/>
                    <Route path='/:comicNumber' element={<ComicPage/>}/>
                    <Route path='*' element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </>
    )
}
export default App;
