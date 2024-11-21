import Banner from "@/components/banner";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner></Banner>
      {children}
    </>
  );
}
