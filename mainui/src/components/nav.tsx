import { Anchor, Tooltip, UnstyledButton } from "@mantine/core";
import styles from "../styles/sass/nav.module.scss";
import { BsDownload, BsGithub, BsLinkedin } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

export const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(!menuOpen);

  const redirectTo = (anchor: string): string => {
    const site = (process.env.NEXT_PUBLIC_BACKEND_URI ?? "").includes(
      "localhost"
    )
      ? "http://localhost:3000"
      : "https://callummclu.co.uk";
    return `${site}/#${anchor}`;
  };

  return (
    <div className={`${styles.nav} ${menuOpen && styles.open}`}>
      <UnstyledButton
        aria-label="menu button"
        onClick={openMenu}
        className={styles.hamburger}
        style={{ animation: "fadeMe 0.2s" }}
      >
        {menuOpen ? (
          <IoMdClose color={"grey"} size={24} />
        ) : (
          <BiMenu color={"gray"} size={24} />
        )}
      </UnstyledButton>
      <div className={`${styles.section} ${menuOpen && styles.show}`}>
        <a href="/">Home</a>
        <a href={redirectTo("about")}>About</a>
        <a href={redirectTo("work")}>Work</a>
        <a href={redirectTo("technologies")}>Technologies</a>
        <a href={redirectTo("projects")}>Projects</a>
      </div>
      <div
        className={`${styles.section} ${
          menuOpen && `${styles.show} ${styles.icons}`
        }`}
      >
        <Tooltip label="Github">
          <Anchor
            href="https://github.com/callummclu"
            style={{ animation: "fadeMe 0.2s" }}
          >
            <BsGithub aria-label="github" color={"gray"} size={18} />
          </Anchor>
        </Tooltip>
        <Tooltip label="LinkedIn">
          <Anchor
            href="https://www.linkedin.com/in/callummclu/"
            style={{ animation: "fadeMe 0.2s" }}
          >
            <BsLinkedin aria-label="linkedin" color={"gray"} size={18} />
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
            <BsDownload aria-label="CV" color={"gray"} size={18} />
          </Anchor>
        </Tooltip>
      </div>
    </div>
  );
};
