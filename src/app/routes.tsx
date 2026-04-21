import { createBrowserRouter } from "react-router";
import { PhoneFrame } from "./components/PhoneFrame";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { InventoryOverviewScreen } from "./screens/InventoryOverviewScreen";
import { ProductDetailsScreen } from "./screens/ProductDetailsScreen";
import { LowStockScreen } from "./screens/LowStockScreen";
import { SalesTrendsScreen } from "./screens/SalesTrendsScreen";
import { SalesForecastScreen } from "./screens/SalesForecastScreen";
import { ProductForecastScreen } from "./screens/ProductForecastScreen";
import { PromosDashboardScreen } from "./screens/PromosDashboardScreen";
import { GeneratePromoScreen } from "./screens/GeneratePromoScreen";
import { AssignPromoScreen } from "./screens/AssignPromoScreen";
import { ActivePromosScreen } from "./screens/ActivePromosScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PhoneFrame,
    children: [
      { index: true, Component: WelcomeScreen },
      { path: "login", Component: LoginScreen },
      { path: "dashboard", Component: DashboardScreen },
      { path: "inventory", Component: InventoryOverviewScreen },
      { path: "product/:id", Component: ProductDetailsScreen },
      { path: "low-stock", Component: LowStockScreen },
      { path: "sales-trends", Component: SalesTrendsScreen },
      { path: "sales-forecast", Component: SalesForecastScreen },
      { path: "product-forecast", Component: ProductForecastScreen },
      { path: "promos", Component: PromosDashboardScreen },
      { path: "generate-promo", Component: GeneratePromoScreen },
      { path: "assign-promo", Component: AssignPromoScreen },
      { path: "active-promos", Component: ActivePromosScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
