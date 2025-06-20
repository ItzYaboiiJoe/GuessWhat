export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <div className="bg-[#F8ECE1]">{children}</div>
    </div>
  );
}
