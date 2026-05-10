import { AlertTriangle } from "lucide-react";

export function ErrorState({ message, retry }: { message: string, retry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass rounded-lg border border-red-500/20 bg-red-500/10 min-h-[300px]">
      <AlertTriangle className="w-12 h-12 text-red-400 mb-4" />
      <h3 className="text-lg font-semibold text-red-200 mb-2">Connection Error</h3>
      <p className="text-red-300/80 mb-6 max-w-md">
        {message || "We couldn't connect to the election database. The server might be down or undergoing maintenance."}
      </p>
      {retry && (
        <button 
          onClick={retry}
          className="px-6 py-2 rounded-sm bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
