"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {};
type sessionData = {
  user?: {
    image?: string;
  };
};
const Nav = (props: Props) => {
  return (
    <React.Fragment>
      <header className="flex flex-col items-center justify-center w-full">
        <nav className="flex items-center justify-between w-full pt-3 mb-10">
          <Link href="/" className="flex gap-2 flex-center">
            <span>Back to PDF Reader</span>
          </Link>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Nav;
