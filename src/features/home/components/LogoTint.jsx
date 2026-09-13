const LogoTint = ({ src, colorClass = "bg-blue-600", className = "" }) => {
  return (
    <div
      className={`${colorClass} ${className}`}
      style={{
        maskImage: `url(${src})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
      }}
    />
  );
};

export default LogoTint;
