export default function TripLoginPage() {
  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <p className="text-sm text-neutral-600">
        This area is protected by Basic Auth in middleware. Configure `BASIC_USER` and `BASIC_PASS` in your env.
      </p>
    </main>
  )
}


