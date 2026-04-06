import { Button } from "@components/ui/Button";
import Modal from "@components/ui/Modal";
import ModalDrawer from "@components/ui/ModalDrawer";
import { Tooltip } from "@components/ui/Tooltip";
import { useState } from "react";

import { DemoSection } from "../DemoSection";

export function OverlaysPage(): React.ReactElement {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="tooltip"
        title="Tooltip"
        props={[
          { name: "content", description: "Tooltip body." },
          { name: "placement", description: "Positioning (see component)." },
        ]}
      >
        <Tooltip content="Extra context on hover">
          <Button type="button" variant="outline">
            Hover me
          </Button>
        </Tooltip>
      </DemoSection>

      <DemoSection
        id="modal"
        title="Modal"
        props={[
          { name: "isOpen / onClose", description: "Visibility." },
          { name: "title", description: "Header text." },
          { name: "primaryButtonText / onPrimaryAction", description: "Primary action." },
          { name: "size", description: "sm | md | lg" },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm action"
            primaryButtonText="Continue"
            secondaryButtonText="Cancel"
            onPrimaryAction={() => setModalOpen(false)}
            size="md"
          >
            <p className="text-sm text-rspl-neutral-600">
              Modals trap focus and close on Escape. Wire primary/secondary actions to your
              async flows.
            </p>
          </Modal>
        </div>
      </DemoSection>

      <DemoSection
        id="drawer"
        title="ModalDrawer"
        props={[
          { name: "position", description: "left | right slide-in." },
          { name: "size", description: "sm … 4xl | custom + customWidth." },
          { name: "footer", description: "Sticky footer slot." },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <ModalDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filters"
            position="right"
            size="md"
            footer={
              <Button type="button" onClick={() => setDrawerOpen(false)}>
                Apply
              </Button>
            }
          >
            <p className="text-sm text-rspl-neutral-600">
              Use drawers for long forms, filters, or detail panels. Same backdrop + Escape
              behavior as modals.
            </p>
          </ModalDrawer>
        </div>
      </DemoSection>
    </div>
  );
}
