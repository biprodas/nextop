import { ReactNode } from "react";

interface HeadingProps {
  title: string;
  description: string;
  extra?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  extra,
}) => {
  return (
    <div className="flex justify-between items-center border-b mb-3 py-1">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm font-light text-muted-foreground">
          {description}
        </p>
      </div>
      {extra}
    </div>
  );
};
