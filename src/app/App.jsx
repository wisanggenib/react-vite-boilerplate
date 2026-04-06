/**
 * Main App component — handles layout switching
 */

import { useState } from "react";
import { getPageComponent } from "./routes";
import { useCart } from "../features/cart";
import { PublicLayout } from '@/shared/components/layout/PublicLayout'
import { PrivateLayout } from '@/shared/components/layout/PrivateLayout'

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const { addItem } = useCart();

  const page = getPageComponent(activePage, {
    onAddToCart: addItem,
    onNavigate: setActivePage,
  });

  // Determine which layout to use
  const isPublicPage = activePage === "login" || activePage === "register";

  if (isPublicPage) {
    return <PublicLayout>{page ? page.component : null}</PublicLayout>;
  }

  return (
    <PrivateLayout
      activePage={activePage}
      onNavigate={setActivePage}
      title={page ? page.title : undefined}
      subtitle={page ? page.subtitle : undefined}
    >
      {page ? page.component : null}
    </PrivateLayout>
  );
}
