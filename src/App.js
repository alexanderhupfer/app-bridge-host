import React from "react";

import {
  AppProvider,
  Frame,
  Navigation as PolarisNavigation,
  TopBar
} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/styles.css";

import logger from "redux-logger";

import {
  ArrowLeftMinor,
  HomeMajorMonotone,
  OrdersMajorTwotone,
  ConversationMinor
} from "@shopify/polaris-icons";

import { HostProvider } from "@shopify/app-bridge-host";
import MainFrame from "@shopify/app-bridge-host/components/MainFrame";
import Navigation from "@shopify/app-bridge-host/components/Navigation";
import { Group } from "@shopify/app-bridge/actions";
import Loading from "@shopify/app-bridge-host/components/Loading";
// import { Modal } from "@shopify/app-bridge-host/components/Modal";
import { setFeaturesAvailable } from "@shopify/app-bridge-host/store";

const router = {
  location: {
    pathname: window.location.pathname,
    search: window.location.search
  },
  history: {
    push(path) {
      window.history.pushState("", null, path);
    },
    replace(path) {
      window.history.replaceState("", null, path);
    }
  }
};

const initialState = {
  features: setFeaturesAvailable(Group.Navigation, Group.Loading)
};

const config = {
  apiKey: "2ca57b9f8ea64fc449ca4d20610884ec",
  appId: "gid://shopify/App/2654795",
  handle: "quinn",
  shopId: "gid://shopify/Shop/10405969984",
  url: "https://quinndev.satel.ca",
  name: "Quinn"
};

const configFCQA = {
  apiKey: "5c9921e564fd6ebe168a01dd853d15fe",
  appId: "gid://shopify/App/3259681",
  handle: "fame-club-qa",
  shopId: "gid://shopify/Shop/10405969984",
  url: "https://fh-club-qa.satelcreative.com?shop=qhlhy.csb.app",
  name: "Quinn"
};

const configTest = {
  apiKey: "2ca57b9f8ea64fc449ca4d20610884ec",
  appId: "gid://shopify/App/3259681",
  handle: "fame-club-qa",
  shopId: "gid://shopify/Shop/10405969984",
  url: "http://localhost:8000",
  name: "Quinn"
};

function Host({ children }) {
  return (
    <HostProvider
      config={configTest}
      components={[MainFrame, Navigation, Loading]}
      initialState={initialState}
      router={router}
      middleware={[logger]}
    >
      {children}
    </HostProvider>
  );
}

const topBarMarkup = <TopBar showNavigationToggle />;

const navigationMarkup = (
  <PolarisNavigation location="/">
    <PolarisNavigation.Section
      items={[
        {
          label: "Back to Shopify",
          icon: ArrowLeftMinor
        }
      ]}
    />
    <PolarisNavigation.Section
      separator
      title="Jaded Pixel App"
      items={[
        {
          label: "Dashboard",
          icon: HomeMajorMonotone,
          onClick: console.log
        },
        {
          label: "Jaded Pixel Orders",
          icon: OrdersMajorTwotone,
          onClick: console.log
        }
      ]}
      action={{
        icon: ConversationMinor,
        accessibilityLabel: "Contact support",
        onClick: console.log
      }}
    />
  </PolarisNavigation>
);

export default function App() {
  return (
    <AppProvider i18n={en}>
      <Frame navigation={navigationMarkup} topBar={topBarMarkup}>
        <Host />
      </Frame>
    </AppProvider>
  );
}
