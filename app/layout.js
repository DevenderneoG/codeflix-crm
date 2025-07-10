

"use client";

import "./globals.css";
import "./data-tables-css.css";
// import "./satoshi.css";
import { useState, useEffect } from "react";
// import Loader from "@/components/common/Loader";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";
import { Provider } from "react-redux";
import Sidebar from "./components/Sidebar";
// import { store } from "@/app/store/store";
import store from "./store/store";
import Loader from "./components/common/Loader";
import Header from "./components/Header";
import localFont from 'next/font/local'

const satoshi = localFont({
  src: [
    {
      // path: './fonts/Satoshi-Light.woff',
      path: '../fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      // path: '../fonts/Satoshi-Bold.woff2',
      path: '../fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" className={satoshi.className}>
      <body suppressHydrationWarning={true} >
        <Provider store={store}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                {/* Content Area */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  {/* Header */}
                  <Header 
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />

                  {/* Main Content */}
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            )}
          </div>
        </Provider>
      </body>
    </html>
  );
}
