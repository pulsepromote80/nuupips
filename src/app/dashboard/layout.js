export default function DashboardLayout({ children }) {
  return (
    // <div className="flex min-h-screen bg-gray-100">
      <div className="flex flex-col flex-1">
        <main className="p-6">
          {children}
        </main>
      </div>
    // </div>
  )
}