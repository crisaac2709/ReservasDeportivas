
export const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div style={{ marginBottom: "12px" }}>
      <label>{label}</label><br />
      <input
        className="input-campo"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          padding: "8px",
          width: "100%",
          borderRadius: "4px",
          border: error ? "1px solid red" : "1px solid #ccc"
        }}
      />
      {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}
    </div>
  );
};
