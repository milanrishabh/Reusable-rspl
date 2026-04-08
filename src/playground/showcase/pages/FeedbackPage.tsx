import Alert from "@components/ui/Alert";
import { Badge } from "@components/ui/Badge";
import { Chip } from "@components/ui/Chip";
import { DynamicProgressBar } from "@components/ui/DynamicProgressBar";
import { Progress } from "@components/ui/Progressbar";
import { Skeleton } from "@components/ui/Skeleton";
import { Spinner } from "@components/ui/Spinner";
import { StatusBadge } from "@components/ui/StatusBadge";
import { useState } from "react";

import { DemoSection } from "../DemoSection";

export function FeedbackPage(): React.ReactElement {
  const [progress, setProgress] = useState(40);

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="alert"
        title="Alert"
        description="Inline status message. Variants: info, success, warning, error."
        props={[
          { name: "variant", description: "Visual tone." },
          { name: "children", description: "Message content." },
          { name: "showIcon", description: "Toggle default icon." },
        ]}
      >
        <div className="flex flex-col gap-3 space-y-3">
          <Alert variant="info">Info message for neutral context.</Alert>
          <Alert variant="success">Saved successfully.</Alert>
          <Alert variant="warning">Review before continuing.</Alert>
          <Alert variant="error">Something went wrong.</Alert>
        </div>
      </DemoSection>

      <DemoSection
        id="badge"
        title="Badge"
        props={[
          { name: "variant", description: "e.g. default, secondary, outline." },
          { name: "size", description: "sm | md | lg" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary" size="md">
            Secondary
          </Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Vue</Badge>
          <Badge variant="warning">Svelte</Badge>
          <Badge variant="error">Solid</Badge>
          <Badge variant="outline">Next.js</Badge>
          <Badge variant="default">Nuxt.js</Badge>
        </div>
      </DemoSection>

      <DemoSection
        id="chip"
        title="Chip"
        props={[
          { name: "children", description: "Chip label." },
          { name: "onRemove", description: "If set, shows a remove control." },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Chip variant="primary">React</Chip>
          <Chip variant="secondary">Angular</Chip>
          <Chip variant="success">Vue</Chip>
          <Chip variant="warning">Svelte</Chip>
          <Chip variant="error">Solid</Chip>
          <Chip variant="outline">Next.js</Chip>
          <Chip variant="default">Nuxt.js</Chip>
          <Chip onRemove={() => undefined}>Removable</Chip>
        </div>
      </DemoSection>

      <DemoSection
        id="status-badge"
        title="StatusBadge"
        description="Semantic status pill for workflows."
        props={[{ name: "status", description: "Maps to color + label." }]}
      >
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="active">Active</StatusBadge>
          <StatusBadge status="draft">Draft</StatusBadge>
          <StatusBadge status="pending">Pending</StatusBadge>
        </div>
      </DemoSection>

      <DemoSection
        id="spinner"
        title="Spinner"
        props={[{ name: "size", description: "Optional size className hook." }]}
      >
        <div className="flex items-center gap-4">
          <Spinner />
          <span className="text-sm text-rspl-neutral-600">Loading…</span>
        </div>
      </DemoSection>

      <DemoSection
        id="skeleton"
        title="Skeleton"
        props={[{ name: "className", description: "Width/height utilities." }]}
      >
        <Skeleton className="h-4 w-full max-w-md" />
      </DemoSection>

      <DemoSection
        id="progress"
        title="Progress"
        description="Determinate bar from Progressbar.tsx (exported as Progress)."
        props={[
          { name: "value", description: "0–100" },
          { name: "layout", description: "default | figma | alignPercentage" },
        ]}
      >
        <Progress
          value={62}
          showLabel={false}
          showInfo={false}
          className="w-full"
        />
      </DemoSection>

      <DemoSection
        id="dynamic-progress"
        title="DynamicProgressBar"
        description="Supports values above 100 with a second segment."
        props={[
          { name: "value / maxValue", description: "Numeric progress model." },
          {
            name: "variant",
            description: "default | success | warning | error | …",
          },
          { name: "infoText", description: "Tooltip helper via Tooltip." },
        ]}
      >
        <div className="space-y-6 w-full">
          <DynamicProgressBar
            value={progress}
            label="Budget"
            infoText="Info"
            className="w-full"
          />
          <label className="flex items-center gap-2 text-sm">
            <span className="dark:text-rspl-neutral-200">
              Value: {progress}
            </span>
            <input
              type="range"
              min={0}
              max={150}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className="flex-1"
            />
          </label>
          <DynamicProgressBar
            value={120}
            maxValue={150}
            variant="success"
            label="Over 100%"
            className="w-full"
          />
        </div>
      </DemoSection>
    </div>
  );
}
