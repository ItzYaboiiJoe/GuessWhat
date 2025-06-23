import Header from "@/components/shared/header";
// import Footer from "@/components/shared/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="bg-[#F8ECE1]">{children}</div>
      {/* <Footer /> */}
    </div>
  );
}
