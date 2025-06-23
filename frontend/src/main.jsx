import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import UserContext from './context/userContext.jsx';
import SocketProvider from './context/SocketContext.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <UserContext>
        <SocketProvider>
          <App />
        </SocketProvider>
      </UserContext>
    </Provider>
  </BrowserRouter>
)
