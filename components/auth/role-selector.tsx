interface RoleSelectorProps {
  selectedRole: "student" | "sponsor";
  onChange: (role: "student" | "sponsor") => void;
}

export function RoleSelector({ selectedRole, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => onChange("student")}
        className={`p-4 rounded-lg border-2 text-center transition-all ${
          selectedRole === "student"
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50"
        }`}
      >
        <h3 className="font-medium">Student</h3>
        <p className="text-sm text-muted-foreground">
          Create and manage projects
        </p>
      </button>

      <button
        type="button"
        onClick={() => onChange("sponsor")}
        className={`p-4 rounded-lg border-2 text-center transition-all ${
          selectedRole === "sponsor"
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary/50"
        }`}
      >
        <h3 className="font-medium">Sponsor</h3>
        <p className="text-sm text-muted-foreground">
          Fund student projects
        </p>
      </button>
    </div>
  );
}
