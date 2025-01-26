import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Auth Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>

      {/* Right: Feature Showcase */}
      <div className="hidden lg:block relative bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-bold">Fund Your Innovation</h2>
            <p className="text-muted-foreground max-w-md">
              Connect with sponsors who believe in student potential and bring
              your projects to life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
