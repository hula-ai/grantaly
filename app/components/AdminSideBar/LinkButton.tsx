import React from "react";
// import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

interface Props {
  title: string;
  links: Array<{ title: string; pathname: string }>;
  isButton?: boolean;
  pathname?: string;
}

const LinkButton = ({ title, links, isButton, pathname }: Props) => {
  return (
    <>
      {isButton ? (
        <Link href={pathname ?? "/"}>
          
            <button
              className="w-full py-6 text-left bg-white hover:bg-white"
            >
              {title}
            </button>
          
        </Link>
      ) : (
        <div className="relative">
          <button
            className="w-full py-6 text-left bg-white hover:bg-white active:bg-white flex justify-between items-center"
          >
            {title}
            {/* <ChevronDownIcon className="w-5 h-5" /> */}
          </button>
          <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg">
            <div className="border-b border-gray-200">
              {links?.map((item, i) => {
                return (
                  <Link key={i} href={item.pathname}>
                    
                      <div className="px-5 py-2 text-gray-700 font-medium hover:bg-purple-100 hover:text-white">
                        {item.title}
                      </div>
                    
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkButton;
