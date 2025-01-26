export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-text-dark sm:text-5xl lg:text-6xl">
              Empower Student
              <span className="text-primary">Innovators!</span>
            </h1>
            <p className="mt-6 text-lg text-text-light">
              Connect with sponsors who believe in student potential and bring
              your projects to life.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="btn-primary">
                Submit Your Project
              </Button>
              <Button size="lg" variant="outline" className="btn-outline">
                Browse Projects
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Add hero image or illustration here */}
          </div>
        </div>
      </div>
    </section>
  );
}
