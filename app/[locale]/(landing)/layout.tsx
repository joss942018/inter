import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </main>
  );
}

export default Layout;
