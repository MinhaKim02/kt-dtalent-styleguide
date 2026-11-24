import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ToastProvider } from '@fe/components/ui/Toast'
import { Layout } from './docs/Layout'
import * as C from './pages/Components'
import * as F from './pages/Foundations'
import * as G from './pages/Guides'
import './styles.css'

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        { path: '/', element: <G.HomePage /> },
        { path: '/foundations/color', element: <F.ColorPage /> },
        { path: '/foundations/typography', element: <F.TypographyPage /> },
        { path: '/foundations/layout', element: <F.LayoutPage /> },
        { path: '/foundations/surface', element: <F.SurfacePage /> },
        { path: '/foundations/interaction', element: <F.InteractionPage /> },
        { path: '/foundations/icons', element: <F.IconsPage /> },
        { path: '/foundations/motion', element: <F.MotionPage /> },
        { path: '/components/button', element: <C.ButtonPage /> },
        { path: '/components/menu-button', element: <C.MenuButtonPage /> },
        { path: '/components/badge', element: <C.BadgePage /> },
        { path: '/components/field', element: <C.FieldPage /> },
        { path: '/components/selection', element: <C.SelectionPage /> },
        { path: '/components/filter-chips', element: <C.FilterChipsPage /> },
        { path: '/components/table', element: <C.TablePage /> },
        { path: '/components/dialog', element: <C.DialogPage /> },
        { path: '/components/banner', element: <C.BannerPage /> },
        { path: '/components/toast', element: <C.ToastPage /> },
        { path: '/components/state', element: <C.StatePage /> },
        { path: '/components/revision-note', element: <C.RevisionNotePage /> },
        { path: '/components/navigation', element: <C.NavigationPage /> },
        { path: '/patterns/feedback', element: <G.FeedbackPatternPage /> },
        { path: '/patterns/submit', element: <G.SubmitPatternPage /> },
        { path: '/patterns/list', element: <G.ListPatternPage /> },
        { path: '/patterns/import', element: <G.ImportPatternPage /> },
        { path: '/patterns/password', element: <G.PasswordPatternPage /> },
        { path: '/writing', element: <G.WritingPage /> },
        { path: '/writing/errors', element: <G.ErrorWritingPage /> },
        { path: '*', element: <G.HomePage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>,
)
