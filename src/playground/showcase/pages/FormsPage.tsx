import { Button } from "@components/ui/Button";
import { Checkbox } from "@components/ui/Checkbox";
import { FileUpload } from "@components/ui/FileUpload";
import { Input } from "@components/ui/Input";
import { Label } from "@components/ui/Label";
import { Radio } from "@components/ui/Radio";
import { Slider } from "@components/ui/Slider";
import Switch from "@components/ui/Switch";
import { Textarea } from "@components/ui/Textarea";
import { useState } from "react";

import { DemoSection } from "../DemoSection";

export function FormsPage(): React.ReactElement {
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState("a");
  const [sw, setSw] = useState(false);
  const [slider, setSlider] = useState(30);

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="button"
        title="Button"
        props={[
          { name: "variant", description: "primary | secondary | ghost | outline | destructive | flow" },
          { name: "size", description: "xsm | sm | md | lg | iconMd" },
          { name: "tooltip", description: "Optional tooltip content." },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" type="button">
            Primary
          </Button>
          <Button variant="secondary" type="button">
            Secondary
          </Button>
          <Button variant="outline" type="button">
            Outline
          </Button>
          <Button variant="destructive" type="button">
            Destructive
          </Button>
        </div>
      </DemoSection>

      <DemoSection
        id="input-label"
        title="Input & Label"
        props={[
          { name: "Input: error", description: "Shows error state." },
          { name: "Label: required", description: "Shows required marker." },
        ]}
      >
        <div className="max-w-md space-y-4">
          <div>
            <Label htmlFor="demo-input">Email</Label>
            <Input id="demo-input" placeholder="you@company.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="demo-err">With error</Label>
            <Input
              id="demo-err"
              error="This field is required"
              className="mt-1"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection
        id="textarea"
        title="Textarea"
        props={[
          { name: "enableMentions", description: "Optional @-mentions dropdown." },
          { name: "showCharCount", description: "Shows length vs maxLength." },
        ]}
      >
        <Textarea
          label="Notes"
          placeholder="Type here…"
          rows={4}
          showCharCount
          maxLength={200}
          enableMentions
          mentionOptions={[
            { id: "1", label: "Team", value: "team" },
            { id: "2", label: "Lead", value: "lead" },
          ]}
        />
      </DemoSection>

      <DemoSection
        id="checkbox"
        title="Checkbox"
        props={[{ name: "isIndeterminate", description: "Tri-state header pattern." }]}
      >
        <Checkbox
          id="demo-cb"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          label="Accept terms"
        />
      </DemoSection>

      <DemoSection
        id="radio"
        title="Radio"
        props={[{ name: "name", description: "Group radios with the same name." }]}
      >
        <div className="flex flex-col gap-2">
          <Radio
            name="demo-radio"
            value="a"
            checked={radio === "a"}
            onChange={() => setRadio("a")}
            label="Option A"
          />
          <Radio
            name="demo-radio"
            value="b"
            checked={radio === "b"}
            onChange={() => setRadio("b")}
            label="Option B"
          />
        </div>
      </DemoSection>

      <DemoSection
        id="switch"
        title="Switch"
        props={[{ name: "checked / onChange", description: "Controlled boolean." }]}
      >
        <div className="flex items-center gap-3">
          <Switch id="demo-sw" checked={sw} onChange={setSw} />
          <Label htmlFor="demo-sw">Enable feature</Label>
        </div>
      </DemoSection>

      <DemoSection
        id="slider"
        title="Slider"
        props={[{ name: "value / onChange", description: "Numeric range input." }]}
      >
        <div className="max-w-md space-y-2">
          <Label>Volume: {slider}</Label>
          <Slider min={0} max={100} value={slider} onChange={setSlider} />
        </div>
      </DemoSection>

      <DemoSection
        id="file-upload"
        title="FileUpload"
        description="Uses useAnnounce + ToastContainer for validation toasts."
        props={[
          { name: "multiple", description: "Multi-file mode with onFilesChange." },
          { name: "accept / maxSize", description: "Browser validation helpers." },
        ]}
      >
        <div className="max-w-lg">
          <FileUpload label="Attachment" showRemoveIcon />
        </div>
      </DemoSection>
    </div>
  );
}
