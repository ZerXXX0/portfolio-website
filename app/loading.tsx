import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="min-h-screen space-y-16 p-6">
      <section className="container mx-auto max-w-4xl text-center space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-10 w-64" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-4 w-[600px]" />
        </div>
        <div className="flex justify-center gap-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </section>

      <section className="container mx-auto max-w-6xl">
        <div className="flex justify-center mb-8">
          <Skeleton className="h-8 w-72" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-48" />
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
