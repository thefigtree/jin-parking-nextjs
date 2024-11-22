import LocationButton from "./_components/location-button";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <LocationButton></LocationButton>
    </div>
  );
}
