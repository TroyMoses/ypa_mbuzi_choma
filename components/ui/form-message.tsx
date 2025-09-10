import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormMessageProps {
  type: "success" | "error";
  message: string;
  errors?: string[];
}

export function FormMessage({ type, message, errors }: FormMessageProps) {
  return (
    <Alert
      className={
        type === "success"
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      }
    >
      {type === "success" ? (
        <CheckCircle className="h-4 w-4 text-green-600" />
      ) : (
        <AlertCircle className="h-4 w-4 text-red-600" />
      )}
      <AlertDescription
        className={type === "success" ? "text-green-800" : "text-red-800"}
      >
        <div>{message}</div>
        {errors && errors.length > 0 && (
          <ul className="mt-2 list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">
                {error}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  );
}
