export default function Heading({
  children,
  className = "",
}) {
  return (
    <h2
      className={`heading-font font-extrabold text-[#16223A] ${className}`}
    >
      {children}
    </h2>
  );
}