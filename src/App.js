import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState("");
  async function handleResponse(response) {
    console.log(response);
    fetch("http://localhost:7000/api/auth/google-sign-in", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        oAuthToken: response.credential,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // set the token , save to store local storage and navigate to next in flow
        setUserInfo(data.data);
      });
  }
  useEffect(() => {
    /* global google */
    // Add script tag <script src="https://accounts.google.com/gsi/client" async defer></script> to index.html. That creates global google.
    google.accounts.id.initialize({
      client_id:
        "898210389645-po609nrob379rmvihsapg6q9avfh4knv.apps.googleusercontent.com",
      callback: handleResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInContainer"),
      { theme: "outline", size: "large" }
    );
  }, []);
  return (
    <div className="App">
      <header className="App-header">Google SIgnIn</header>
      <div id="signInContainer"></div>
      <div>{userInfo}</div>
    </div>
  );
}

export default App;
