import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AIChatbot from "./components/ai/AIChatbot";

const App = () => {
    return (
        <>
            <AppRoutes />
            <AIChatbot />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="light"
            />
        </>
    );
};

export default App;