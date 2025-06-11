export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-[#EAF4F1]">{children}</div>
    </div>
  );
}
