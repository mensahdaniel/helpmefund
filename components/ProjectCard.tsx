interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  image: string;
}

export function ProjectCard({
  title,
  description,
  category,
  fundingGoal,
  currentFunding,
  image,
}: ProjectCardProps) {
  const progress = (currentFunding / fundingGoal) * 100;

  return (
    <div className="card group hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <span className="absolute bottom-2 left-2 rounded-full bg-primary px-3 py-1 text-xs text-white">
          {category}
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-text-dark">{title}</h3>
        <p className="line-clamp-2 text-sm text-text-light">{description}</p>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-text-light">
            <span>${currentFunding.toLocaleString()}</span>
            <span>of ${fundingGoal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
