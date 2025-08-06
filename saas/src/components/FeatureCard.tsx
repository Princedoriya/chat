import { LucideIcon } from "lucide-react";

export default function FeatureCard(props: {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
}) {
  const { title, description, icon: Icon, children } = props;
  return (
    <div className="backdrop-blur-sm border-1 hover:scale-95 transition duration-600 border-lime-400/50 rounded-3xl p-6">
      <div>{children}</div>
      <div className="aspect-video">
        <div className="flex items-center gap-3 mt-6">
          {Icon && <Icon className="w-8 h-8 text-lime-400" />}
          <h3 className="text-3xl font-medium">{title}</h3>
        </div>
        <p className="text-white/50 mt-4">{description}</p>
      </div>
    </div>
  );
}
//////
