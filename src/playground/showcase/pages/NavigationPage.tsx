import { Accordion } from "@components/ui/Accordion";
import {
  Carousel,
  CarouselSlide,
  ImageCarousel,
} from "@components/ui/Carousel";
import Stepper from "@components/ui/Stepper";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/Tabs";
import { useState } from "react";

import { DemoSection } from "../DemoSection";

const stepperSteps = [
  {
    id: 1,
    title: "Account",
    subtitle: "Sign in",
    isCompleted: true,
    isAccessible: true,
    isCurrent: false,
  },
  {
    id: 2,
    title: "Plan",
    subtitle: "Choose tier",
    isCompleted: false,
    isAccessible: true,
    isCurrent: true,
  },
  {
    id: 3,
    title: "Billing",
    subtitle: "Payment",
    isCompleted: false,
    isAccessible: false,
    isCurrent: false,
  },
];

export function NavigationPage(): React.ReactElement {
  const [step, setStep] = useState(2);

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="tabs"
        title="Tabs"
        props={[
          { name: "defaultValue / value", description: "Controlled or uncontrolled tab id." },
          { name: "TabsList / TabsTrigger / TabsContent", description: "Composition API." },
        ]}
      >
        <Tabs defaultValue="a" id="demo-tabs">
          <TabsList>
            <TabsTrigger value="a">Overview</TabsTrigger>
            <TabsTrigger value="b">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="a">
            <p className="text-sm text-rspl-neutral-600">Overview content.</p>
          </TabsContent>
          <TabsContent value="b">
            <p className="text-sm text-rspl-neutral-600">Details content.</p>
          </TabsContent>
        </Tabs>
      </DemoSection>

      <DemoSection
        id="stepper"
        title="Stepper"
        props={[
          { name: "steps", description: "StepperStep[] with completion + accessibility flags." },
          { name: "onStepClick", description: "Navigate when step.isAccessible." },
          { name: "variant", description: "default | compact" },
        ]}
      >
        <Stepper
          steps={stepperSteps.map((s) => ({
            ...s,
            isCurrent: s.id === step,
          }))}
          onStepClick={(id) => setStep(id)}
        />
      </DemoSection>

      <DemoSection
        id="accordion"
        title="Accordion"
        props={[
          { name: "title", description: "Header label." },
          { name: "defaultExpanded", description: "Initial open state." },
          { name: "headerActions", description: "Slot next to chevron." },
        ]}
      >
        <Accordion title="Section A" defaultExpanded>
          <p className="text-sm text-rspl-neutral-600">Collapsible content for FAQs or settings.</p>
        </Accordion>
      </DemoSection>

      <DemoSection
        id="carousel"
        title="Carousel & CarouselSlide"
        props={[
          { name: "children", description: "CarouselSlide items." },
          { name: "autoplay / infinite", description: "Optional behaviors (see component)." },
        ]}
      >
        <div className="mx-auto max-w-md">
          <Carousel showDots showArrows aspectRatio="video">
            <CarouselSlide>
              <div className="flex h-40 items-center justify-center bg-rspl-primary-50 text-rspl-primary-800">
                Slide 1
              </div>
            </CarouselSlide>
            <CarouselSlide>
              <div className="flex h-40 items-center justify-center bg-rspl-secondary-50 text-rspl-secondary-800">
                Slide 2
              </div>
            </CarouselSlide>
          </Carousel>
        </div>
      </DemoSection>

      <DemoSection
        id="image-carousel"
        title="ImageCarousel"
        description="Opinionated Carousel for image slides."
        props={[
          { name: "images", description: "{ src, alt, caption? }[]" },
          { name: "objectFit", description: "cover | contain" },
        ]}
      >
        <div className="mx-auto max-w-lg">
          <ImageCarousel
            className="aspect-video max-h-80"
            images={[
              {
                src: "https://picsum.photos/id/1015/800/400",
                alt: "Landscape",
                caption: "Example caption",
              },
              {
                src: "https://picsum.photos/id/1016/800/400",
                alt: "Mountains",
              },
            ]}
            showDots
            showArrows
            aspectRatio="video"
          />
        </div>
      </DemoSection>
    </div>
  );
}
