// components/ReportSection.tsx

type SectionProps = {
    title: string;
    content: string;
  };
  
  export default function ReportSection({ title, content }: SectionProps) {
    if (!content) return null;
  
    return (
      <div className="border p-4 rounded shadow-sm bg-white dark:bg-neutral-900">
        <h2 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
          {title.replace("_", " ")}
        </h2>
        <p className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200">
          {content}
        </p>
      </div>
    );
  }
  