import { Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import logo from "@/asset/Logo-new.svg";

const Logo = ({ hasWidth = false }) => {
  return (
    <Link href="/" >
      {" "}
      <Image alt="logo" width={hasWidth ? 120 : 140} src={logo.src} />
    </Link>
  );
};

export default Logo;
