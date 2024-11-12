"use client";
import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { RiFullscreenLine } from "react-icons/ri";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CaseObject, FileUrl, UserObject } from "@/types/type";
import axios from "axios";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import VideoButton from "../VideoButton/VideoButton";
import { ButtonLoading } from "../LoadingSkeleton/LoadingSkeleton";
import EyeTrackingButton from "../EyeTrackingButton/EyeTrackingButton";
import BarChart from "../BarChart/BarChart";
import CaseAnalytics from "../CaseAnalytics/CaseAnalytics";
import { handleGetMode } from "@/helper/mode";
import { Mode } from "@/types/enum";
import { RiFullscreenExitLine } from "react-icons/ri";
import { useDispatch, useSelector } from "@/app/redux/store";
import { getCaseAnalytics } from "@/app/redux/slices/case";
import { handleOpenToast } from "@/helper/toast";
interface Props {
  data: string;
  id: string;
  caseDetails: CaseObject;
}

const CaseInfo: React.FC<Props> = ({ data }) => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [rightSidePanel, setRightSidePanel] = useState<number>(30);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [generateDashboard, setgenerateDashboard] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const openFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        /* Safari */
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        /* IE11 */
        (iframeRef.current as any).msRequestFullscreen();
      }

      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .then(() => console.log("Document Exited from Full screen mode"))
          .catch((err) => console.error(err));
      }
    }
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      // Safari
      (document as any).webkitExitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      // IE11
      (document as any).msExitFullscreen();
    }
  };
  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };
  const handleGenerateDashboard = async () => {
    setgenerateDashboard(true);
    try {
      await dispatch(getCaseAnalytics(id as string)).unwrap();
    } catch (error) {
      setgenerateDashboard(false);
      handleOpenToast("Something went wrong", "error", toast);
    }
  };
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <PanelGroup
      onLayout={(e) => {
        setRightSidePanel(Math.floor(e[1]));
      }}
      autoSaveId="example"
      direction="horizontal"
      style={{ overflow: "auto" }}
    >
      <Panel
        minSize={20}
        defaultSize={70}
      // style={{ backgroundColor: "black", overflow: "auto" }}
      >
        <Box bg={"white"} px={"1.8rem"} width={"100%"}>
          <Box>
            <Heading pt={"30px"} size={"xl"} color={"purple.100"}>
              Case Information
            </Heading>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            gap={"10px"}
            alignItems={"center"}
            my={"20px"}
            flexWrap={"wrap"}
          >
            <Button
              size={"md"}
              color={'white'}
              _hover={{backgroundColor:'purple.100'}}
              bg={'purple.100'}
              variant={"white-solid"}
              onClick={() => router.push("/")}
            >
              Go to Home
            </Button>
            <EyeTrackingButton />

            <VideoButton />
            <Button
              size={"md"}
              variant={"white-solid"}
              onClick={openFullscreen}
              color={'white'}
              _hover={{backgroundColor:'purple.100'}}
              bg={'purple.100'}
            >
              {<RiFullscreenLine />}
            </Button>
          </Box>

          <Box height={"400px"} ref={iframeRef}>
            {isFullscreen ? (
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button
                  size={"md"}
                  variant={"white-solid"}
                  onClick={closeFullscreen}
                  color={'white'}
                  _hover={{backgroundColor:'purple.100'}}
                  bg={'purple.100'}
                >
                  <RiFullscreenExitLine />
                </Button>
              </Box>
            ) : null}

            <iframe
              src={`${process.env.NEXT_PUBLIC_DOCKER_URL}viewer/${data ?? "1.2.156.14702.1.1000.16.0.20200311113603"
                }`}
              id="myIframe"

              style={{
                width: "100%",
                height: "100%",
                border: "1px solid #f7fafc33",
                borderRadius: "10px",
              }}
              allow="camera; microphone"
            />
          </Box>
        </Box>
      </Panel>
      <PanelResizeHandle
        style={{ width: "6px", backgroundColor: "grey", cursor: "col-resize" }}
      />
      <Panel
        minSize={30}
        defaultSize={rightSidePanel}
        style={{ backgroundColor: "white", overflow: "auto" }}
      >
        <Box backgroundColor={"purple.100"} px={"20px"}>
          <Box>
            {!generateDashboard ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                height={"100vh"}
                alignItems={"center"}
              >
                <Button
                  mt={"10px"}
                  bg={"white"}
                  _hover={{ bg: "white" }}
                  color={"purple.100"}
                  // py={6}
                  fontSize={'15px'}
                  onClick={handleGenerateDashboard}
                >
                  Generate Dashboard
                </Button>
              </Box>
            ) : (
              <>
                <CaseAnalytics rightSidePanel={rightSidePanel} />
              </>
            )}
          </Box>
        </Box>
      </Panel>
    </PanelGroup>
  );
};

export default CaseInfo;
