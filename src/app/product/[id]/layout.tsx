import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
export default function Productlayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}