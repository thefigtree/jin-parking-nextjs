import NavigationBar from "@/components/navigation-bar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar></NavigationBar>
      {children}
    </>
  );
}
