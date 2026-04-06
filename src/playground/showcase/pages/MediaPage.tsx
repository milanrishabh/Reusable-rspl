import CalendarView, {
  type CalendarEvent,
  type HourlyEvent,
  type RowData,
} from "@components/ui/CalendarView";
import { Badge } from "@components/ui/Badge";
import { Button } from "@components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Gallery, type GalleryItem } from "@components/ui/Gallery";
import ImageWithFallback from "@components/ui/ImageFallback";
import { Image as ImageIcon, Play, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { DemoSection } from "../DemoSection";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://picsum.photos/id/28/1200/800",
    type: "image",
    alt: "Forest",
    caption: "Gallery item with caption",
  },
  {
    id: 2,
    src: "https://picsum.photos/id/15/1200/800",
    type: "image",
    alt: "Beach",
  },
];

export function MediaPage(): React.ReactElement {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: CalendarEvent[] = useMemo(() => {
    const d = new Date();
    const tomorrow = new Date(d);
    tomorrow.setDate(d.getDate() + 1);
    const nextWeek = new Date(d);
    nextWeek.setDate(d.getDate() + 5);
    return [
      {
        date: d,
        customContent: (
          <span className="text-[10px] font-medium text-rspl-primary-700">Spotlight</span>
        ),
        backgroundColor: "bg-rspl-primary-50",
      },
      {
        date: tomorrow,
        customContent: (
          <span className="text-[10px] font-medium text-rspl-neutral-700">Upload</span>
        ),
      },
      {
        date: nextWeek,
        customContent: (
          <span className="text-[10px] font-medium text-emerald-700">Review</span>
        ),
        backgroundColor: "bg-emerald-50",
      },
    ];
  }, []);

  const hourlyEvents: HourlyEvent[] = useMemo(
    () => [
      { hour: 9, customContent: <span className="text-[10px] font-medium">Stand-up</span> },
      {
        hour: 11,
        customContent: <span className="text-[10px] font-medium">Creative review</span>,
        backgroundColor: "bg-rspl-primary-50",
      },
      {
        hour: 14,
        customContent: <span className="text-[10px] font-medium">Export batch</span>,
      },
      {
        hour: 17,
        customContent: <span className="text-[10px] font-medium">Publish</span>,
        backgroundColor: "bg-emerald-50",
      },
    ],
    [],
  );

  const scheduleRows: RowData[] = useMemo(
    () => [
      { id: "r1", label: "Studio A", count: 12 },
      { id: "r2", label: "Studio B", count: 8 },
      { id: "r3", label: "Field unit", count: 3 },
    ],
    [],
  );

  const calendarShell =
    "rounded-lg border border-rspl-neutral-200 bg-white shadow-sm";

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <DemoSection
        id="card-composition"
        title="Card (composition)"
        description="Three patterns: media hero, dashboard metric, and editorial thread. Headers use bottom border + padding to separate title rows from body content (solid, tinted, or dashed dividers)."
        props={[
          { name: "Card*", description: "Composable primitives from card.tsx." },
        ]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="flex flex-col overflow-hidden pt-0">
            <div className="relative h-36 w-full shrink-0">
              <ImageWithFallback
                src="https://picsum.photos/id/180/800/400"
                fallbackSrc="https://picsum.photos/id/99/800/400"
                alt="Abstract campaign still for featured media card"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-white/90">
                    Featured drop
                  </p>
                  <p className="text-lg font-semibold text-white">Spring reel 2026</p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                  <Play className="h-4 w-4" aria-hidden />
                </span>
              </div>
            </div>
            <CardHeader className="space-y-1 border-b border-rspl-neutral-100 px-4 pb-4 pt-4">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">Campaign assets</CardTitle>
                <Badge variant="secondary" size="sm">
                  4K
                </Badge>
              </div>
              <CardDescription>Hero cut + social crops packaged for your channels.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-4 text-sm text-rspl-neutral-600">
              <div className="flex justify-between border-b border-rspl-neutral-100 py-1">
                <span>Duration</span>
                <span className="font-medium text-rspl-neutral-900">00:32</span>
              </div>
              <div className="flex justify-between border-b border-rspl-neutral-100 py-1">
                <span>Formats</span>
                <span className="font-medium text-rspl-neutral-900">16:9, 9:16, 1:1</span>
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex-wrap gap-2 border-t border-rspl-neutral-100 bg-rspl-neutral-50/80">
              <Button type="button" size="sm" variant="primary">
                Open pack
              </Button>
              <Button type="button" size="sm" variant="outline">
                Share link
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col border-rspl-primary-200/80 shadow-md shadow-rspl-primary-500/5">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b border-rspl-primary-100 px-4 pb-4 pt-4">
              <div>
                <CardTitle className="text-base">Live impressions</CardTitle>
                <CardDescription>Last 24 hours · rolling</CardDescription>
              </div>
              <Badge variant="success" size="sm">
                Live
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center gap-4 px-4 pb-4 pt-4">
              <p className="text-4xl font-semibold tabular-nums tracking-tight text-rspl-neutral-900">
                128.4k
              </p>
              <div className="flex h-10 items-end gap-1">
                {[40, 55, 48, 72, 65, 88, 92].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-rspl-primary-500/90"
                    style={{ height: `${h}%` }}
                    title={`Bar ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-xs text-rspl-neutral-500">
                Compact footer-free layouts work for KPI tiles; pair with a single secondary action
                below.
              </p>
            </CardContent>
            <CardFooter className="mt-auto border-t border-rspl-neutral-100">
              <Button type="button" variant="ghost" size="sm" className="px-0 text-rspl-primary-700">
                Open analytics →
              </Button>
            </CardFooter>
          </Card>

          <Card className="relative flex flex-col overflow-hidden border-rspl-neutral-200">
            <div
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-rspl-primary-500 to-emerald-500"
              aria-hidden
            />
            <CardHeader className="flex flex-row items-center gap-3 border-b border-dashed border-rspl-neutral-200 pl-5 pr-4 pb-4 pt-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rspl-neutral-100 text-rspl-primary-700">
                <ImageIcon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <CardTitle className="text-base">Editorial note</CardTitle>
                <CardDescription>From the design system team</CardDescription>
              </div>
              <Sparkles className="ml-auto h-4 w-4 text-amber-500" aria-hidden />
            </CardHeader>
            <CardContent className="space-y-3 pl-5 pr-4 pb-4 pt-4 text-sm leading-relaxed text-rspl-neutral-700">
              <p>
                Use <span className="font-medium text-rspl-neutral-900">CardFooter</span> for
                actions, metadata, or pagination—keep the body for narrative or lists so scanning
                stays predictable.
              </p>
              <ul className="space-y-2 border-l-2 border-rspl-neutral-200 pl-3 text-rspl-neutral-600">
                <li>Stack related links in the footer as text buttons.</li>
                <li>Swap header density when the card sits in a dense grid.</li>
              </ul>
            </CardContent>
            <CardFooter className="mt-auto flex-wrap gap-2 border-t border-dashed border-rspl-neutral-200 bg-rspl-neutral-50/50 pl-5">
              <Badge variant="outline" size="sm">
                Pattern
              </Badge>
              <Badge variant="outline" size="sm">
                Layout
              </Badge>
              <span className="ml-auto text-xs text-rspl-neutral-500">Footer as tags + hint</span>
            </CardFooter>
          </Card>
        </div>
      </DemoSection>

      <DemoSection
        id="gallery"
        title="Gallery"
        props={[
          { name: "items", description: "GalleryItem[] (image or video URLs)." },
          { name: "showThumbnails / autoPlay", description: "Layout & playback." },
        ]}
      >
        <Gallery items={galleryItems} showThumbnails showCounter />
      </DemoSection>

      <DemoSection
        id="image-fallback"
        title="ImageWithFallback"
        props={[
          { name: "src / fallbackSrc", description: "Primary and backup URL." },
          { name: "alt", description: "Accessible description." },
        ]}
      >
        <div className="max-w-md">
          <ImageWithFallback
            src="https://invalid.url/this-will-404.jpg"
            fallbackSrc="https://picsum.photos/id/99/400/300"
            alt="Demo with fallback"
            className="h-48 w-full rounded-md object-cover"
          />
        </div>
      </DemoSection>

      <DemoSection
        id="calendar-month"
        title="CalendarView — month"
        description="Full month grid with markers. Toggle is hidden so this embed stays in month view only."
        props={[
          { name: "viewMode=\"monthly\"", description: "Fixed month grid." },
          { name: "showViewToggle={false}", description: "Lock the embedded view." },
          { name: "events", description: "Per-day custom cell content." },
        ]}
      >
        <div className={`min-h-[340px] overflow-x-auto p-1 ${calendarShell}`}>
          <CalendarView
            viewMode="monthly"
            showViewToggle={false}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            events={events}
            calendarTitle="Month — campaign dates"
            highlightCurrentDate
            highlightSelectedDate
            weekStartsOn={1}
          />
        </div>
      </DemoSection>

      <DemoSection
        id="calendar-week"
        title="CalendarView — week"
        description="Weekly range with optional detail column for rows (e.g. studios, lanes). Same selected date as month/day demos."
        props={[
          { name: "viewMode=\"weekly\"", description: "Seven-day strip." },
          { name: "showDetailColumn / rows", description: "Row labels + grid cells." },
        ]}
      >
        <div className={`min-h-[280px] overflow-x-auto p-1 ${calendarShell}`}>
          <CalendarView
            viewMode="weekly"
            showViewToggle={false}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            events={events}
            calendarTitle="Week — studio grid"
            highlightSelectedDate
            weekStartsOn={1}
            showDetailColumn
            rows={scheduleRows}
            detailColumnConfig={{ header: "Resource", width: "100px" }}
          />
        </div>
      </DemoSection>

      <DemoSection
        id="calendar-day"
        title="CalendarView — day"
        description="Single-day timeline with hourly slots. Use hourlyEvents for slot labels; detail column optional."
        props={[
          { name: "viewMode=\"daily\"", description: "Hourly timeline." },
          { name: "hourlyEvents", description: "Markers by hour (0–23)." },
        ]}
      >
        <div className={`min-h-[360px] overflow-x-auto p-1 ${calendarShell}`}>
          <CalendarView
            viewMode="daily"
            showViewToggle={false}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            hourlyEvents={hourlyEvents}
            calendarTitle="Day — production schedule"
            highlightSelectedDate
            showDetailColumn
            rows={scheduleRows}
            detailColumnConfig={{ header: "Crew", width: "88px" }}
          />
        </div>
      </DemoSection>
    </div>
  );
}
