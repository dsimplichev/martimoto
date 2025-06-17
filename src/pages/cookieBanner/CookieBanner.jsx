import CookieConsent from "react-cookie-consent";

const CookieBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Приемам"
      declineButtonText="Отказ"
      enableDeclineButton
      cookieName="mySiteCookieConsent"
      style={{
        background: "#2B373B",
        color: "#fff",
        fontSize: "14px",
        padding: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      buttonStyle={{
        background: "#f39c12",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "5px",
        padding: "8px 16px",
        marginLeft: "10px",
        cursor: "pointer",
      }}
      declineButtonStyle={{
        background: "#888",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "5px",
        padding: "8px 16px",
        marginLeft: "10px",
        cursor: "pointer",
      }}
      overlay
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span role="img" aria-label="cookie">🍪</span>
        Нашият сайт използва бисквитки за да функционира правилно и за маркетингови цели. Можете да откажете нежеланите.
      </div>
    </CookieConsent>
  );
};

export default CookieBanner;