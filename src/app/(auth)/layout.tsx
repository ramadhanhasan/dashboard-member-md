import FloatingWhatsAppButton from "../../components/FloatingWhatsAppButton"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <html lang="en">
      <div>{children}
              <FloatingWhatsAppButton />
              </div>
    // </html>
  )
}
