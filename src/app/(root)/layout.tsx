export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* bg-gradient-to-br from-slate-50 to-purple-100 */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500">
        {children}
      </div>
    </div>
  );
}
