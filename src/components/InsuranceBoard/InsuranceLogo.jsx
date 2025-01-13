export default function InsuranceLogo({ name }) {
  return (
    <img
      src={`/src/assets/${name}.png`}
      alt={`${name}`}
      className="w-32 h-32 object-cover rounded-lg shadow-md"
    />
  );
}
