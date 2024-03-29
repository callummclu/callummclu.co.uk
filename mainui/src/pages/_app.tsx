import {
  ActionIcon,
  Affix,
  Anchor,
  MantineProvider,
  Tooltip,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { Nav } from "../components/nav";
import "../styles/sass/index.scss";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import { useViewportSize } from "@mantine/hooks";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsDownload, BsGithub, BsLinkedin } from "react-icons/bs";
import Script from "next/script";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { width } = useViewportSize();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (typeof window !== "undefined") {
        window.addEventListener("load", function () {
          serviceWorkerRegistration.register();
        });
      }
    }
  }, []);

  const redirectTo = (anchor: string): string => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/#${anchor}`;
    }
    return `#${anchor}`;
  };

  const Menu = () => {
    const [menuWidth, setMenuWidth] = useState("calc(100vw - 45px)");
    const [height, setHeight] = useState(400);
    const [opacity, setOpacity] = useState(1);
    const [display, setDisplay] = useState("block");
    const close = () => {
      setMenuWidth("0px");
      setHeight(0);
      setOpacity(0);

      setTimeout(() => {
        setDisplay("none");
        setShowMobileMenu(false);
      }, 100);
    };
    return (
      <Affix style={{ zIndex: 1000 }} position={{ bottom: 20, right: 20 }}>
        <motion.div
          animate={{ width: menuWidth, height, display }}
          className="mobile-menu"
          style={{ position: "relative" }}
        >
          <motion.div
            animate={{ opacity }}
            transition={{ duration: 0 }}
            className="items"
          >
            <a href="/">Home</a>
            <a href={redirectTo("about")}>About</a>
            <a href={redirectTo("technologies")}>Technologies</a>
            <a href={redirectTo("work")}>Work</a>
            <a href={redirectTo("projects")}>Projects</a>

            <div className="icons">
              <Tooltip label="Github">
                <Anchor href="https://github.com/callummclu">
                  <BsGithub aria-label="github" color={"white"} size={18} />
                </Anchor>
              </Tooltip>
              <Tooltip label="LinkedIn">
                <Anchor href="https://www.linkedin.com/in/callummclu/">
                  <BsLinkedin aria-label="linkedin" color={"white"} size={18} />
                </Anchor>
              </Tooltip>
              <Tooltip label="Download my CV">
                <Anchor
                  download="Callum-McLuskey"
                  href={`${
                    process.env.NEXT_PUBLIC_BACKEND_URI?.includes("localhost")
                      ? "http://localhost:3000/extras/Callum-Mcluskey.pdf"
                      : "https://callummclu.co.uk/cv"
                  }`}
                  style={{ animation: "fadeMe 0.2s" }}
                >
                  <BsDownload aria-label="CV" color={"white"} size={18} />
                </Anchor>
              </Tooltip>
            </div>
          </motion.div>

          <button
            onClick={close}
            className="close"
            style={{ cursor: "pointer" }}
          >
            <CgClose color="white" size={40} />
          </button>
        </motion.div>
      </Affix>
    );
  };

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
      {showMobileMenu && width < 760 && <Menu />}
      {width < 760 && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            aria-label="open menu"
            radius="xl"
            variant="filled"
            onClick={() => setShowMobileMenu(true)}
            color={"teal"}
            size={60}
          >
            <GiHamburgerMenu size={30} />
          </ActionIcon>
        </Affix>
      )}
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Notifications />

        <Nav />
        <Container>
          <Component {...pageProps} />
        </Container>
      </MantineProvider>
    </>
  );
}
