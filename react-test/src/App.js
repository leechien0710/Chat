import "./App.css";
import { privateRoutes } from "./routes";
import { ToastContainer } from "react-toastify";
import PrivateRoutes from "./routes/PrivateRoutes";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          {privateRoutes.map((route, index) => {
            return (
              <PrivateRoutes path={route.path} component={route.component} key={index} />
            );
          })}
        </div>
      </BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </>
  );

}
export default App;
