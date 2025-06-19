export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="bg-gradient-to-br from-slate-50 to-purple-100 ">
        {children}
      </div>
    </div>
  );
}
