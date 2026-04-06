import { Button } from "@components/ui/Button";
import { useAnnounce } from "@lib/hooks/useAnnounce";

import { DemoSection } from "../DemoSection";

export function NotificationsPage(): React.ReactElement {
  const { showSuccess, showError, showWarning, showInfo } = useAnnounce();

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="toast-setup"
        title="Toast notifications (react-toastify)"
        description="Render ToastContainer once at the app root (see main.tsx). Styling hooks live in src/styles/notification.css."
        props={[
          { name: "ToastContainer", description: "position, theme, autoClose, className." },
          { name: "useAnnounce", description: "showSuccess | showError | showWarning | showInfo(message)." },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="primary" onClick={() => showSuccess("Saved successfully")}>
            Success
          </Button>
          <Button type="button" variant="destructive" onClick={() => showError("Request failed")}>
            Error
          </Button>
          <Button type="button" variant="secondary" onClick={() => showWarning("Check your input")}>
            Warning
          </Button>
          <Button type="button" variant="outline" onClick={() => showInfo("Heads up")}>
            Info
          </Button>
        </div>
        <p className="mt-4 text-xs text-rspl-neutral-500">
          FileUpload uses the same hook for validation messages when files are rejected.
        </p>
      </DemoSection>
    </div>
  );
}
