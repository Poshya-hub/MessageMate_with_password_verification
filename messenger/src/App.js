import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components//Login";
import Chat from "./components/Chat";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is logged in
        setUser(authUser);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    return () => {
      // Clean up the listener
      unsubscribe();
    };
  }, []);

  return <div className="app">{user ? <Chat user={user} /> : <Login />}</div>;
}

export default App;
