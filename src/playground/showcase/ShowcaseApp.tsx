import { Route, Routes } from "react-router-dom";

import { ShowcaseLayout } from "./ShowcaseLayout";
import { DataPage } from "./pages/DataPage";
import { FeedbackPage } from "./pages/FeedbackPage";
import { FormsPage } from "./pages/FormsPage";
import { IntegrationPage } from "./pages/IntegrationPage";
import { MediaPage } from "./pages/MediaPage";
import { NavigationPage } from "./pages/NavigationPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { OverlaysPage } from "./pages/OverlaysPage";
import { PickersPage } from "./pages/PickersPage";

export function ShowcaseApp(): React.ReactElement {
  return (
    <Routes>
      <Route element={<ShowcaseLayout />}>
        <Route index element={<IntegrationPage />} />
        <Route path="showcase/feedback" element={<FeedbackPage />} />
        <Route path="showcase/forms" element={<FormsPage />} />
        <Route path="showcase/pickers" element={<PickersPage />} />
        <Route path="showcase/data" element={<DataPage />} />
        <Route path="showcase/overlays" element={<OverlaysPage />} />
        <Route path="showcase/navigation" element={<NavigationPage />} />
        <Route path="showcase/media" element={<MediaPage />} />
        <Route path="showcase/notifications" element={<NotificationsPage />} />
      </Route>
    </Routes>
  );
}
