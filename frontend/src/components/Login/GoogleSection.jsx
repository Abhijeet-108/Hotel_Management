import React, { useEffect } from "react";

function GoogleSection({ handleAlternativeLogin }) {
  useEffect(() => {
    /* You can define this function before initialize */
    const handleGoogleResponse = (response) => {
      console.log("Google credential response", response);
      handleAlternativeLogin("google", response.credential);
    };

    window.google?.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [handleAlternativeLogin]);

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        You'll be redirected to Google to sign in.{" "}
        <a href="#" className="text-blue-500">Privacy Policy</a>.
      </p>
      <div id="googleSignInDiv"></div>
    </div>
  );
}

export default GoogleSection;
