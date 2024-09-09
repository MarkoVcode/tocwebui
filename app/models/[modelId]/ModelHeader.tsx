import React from 'react';

interface ModelHeaderProps {
  modelData: any;
}

const ModelHeader: React.FC<ModelHeaderProps> = ({ modelData }) => {
  return (
    <div className="bg-background border-b px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold">{modelData.name}</h1>
        <p className="text-muted-foreground">{modelData.description}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4" />
            <span className="text-sm">{modelData.contributors}</span>
          </div>
          <div className="flex items-center gap-2">
            <TagIcon className="w-4 h-4" />
            <span className="text-sm">{modelData.labels.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelHeader;

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}
