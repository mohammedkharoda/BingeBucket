import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "36px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 96,
          height: 96,
          borderRadius: 20,
          background: "#F9F6F1",
          boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
          border: "1px solid #E5E0D8",
        }}
      >
        <Image src="/logo.png" width={60} height={60} alt="BingeBucket" priority />
      </div>

      {/* Spinner */}
      <div style={{ position: "relative", width: 56, height: 56 }}>
        {/* Gray track */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "4px solid #E5E0D8",
          }}
        />
        {/* Coral + gold spinning arc */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "4px solid transparent",
            borderTopColor: "#E8756A",
            borderRightColor: "#F5C842",
            animation: "bb-spin 0.85s linear infinite",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 6 }}>
        <p
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#374151",
          }}
        >
          Loading
        </p>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 400,
            color: "#9CA3AF",
          }}
        >
          Preparing your next watch…
        </p>
      </div>

      <style>{`
        @keyframes bb-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
