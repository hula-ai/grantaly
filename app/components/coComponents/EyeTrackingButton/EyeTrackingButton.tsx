import { useSelector } from "@/app/redux/store";
import { Box, Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import WarningModal from "../WarningModal/WarningModal";
import { Privacy } from "@/models/case";
import { Role } from "@/types/enum";
import axios from "axios";
import { handleOpenToast } from "@/helper/toast";

const EyeTrackingButton = () => {
  const toast = useToast()
  const { data: token, status } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [isVideoExist, setIsVideoExist] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const caseState = useSelector((state) => state.case.CaseDetails);
  const videoState = useSelector((state) => state.videos.videos);

  const isEyeTracking = token
    ? caseState?.case?.assigne?.some((item: any) => {
      return item === token?.user._id;
    }) ||
    caseState?.case?.userId === token?.user._id ||
    caseState?.case?.privacy === Privacy.PUBLIC ||
    token?.role === Role.ADMIN ||
    token?.role === Role.SUPERADMIN
    : false;
  const handleStartCalibration = async () => {
    setIsConfirm(true);
    try {
      if (videoState?.currentUserVideo && videoState?.currentUserVideo?.videos.length > 0) {
        const deleteVideo = await axios({
          method: "DELETE",
          url: `/api/user/${videoState?.currentUserVideo?.videos[0]._id}/video/`,
        });
        setIsConfirm(false);
      }
      const url = `/eye-tracking/${id}?q=${caseState.orthancId}`;
      window.location.href = url;
    } catch (error) {
      setIsConfirm(false);
      handleOpenToast("Something went wrong", "error", toast)
    }
  };
  const handleEyeTracking = () => {
    if (
      videoState?.currentUserVideo &&
      videoState?.currentUserVideo?.videos?.length > 0
    ) {
      setIsVideoExist(true);
      return;
    }

    handleStartCalibration();
  };

  return (
    <Box>
      <WarningModal
        description={"Are you sure you want override your video?"}
        isOpen={isVideoExist}
        onClose={() => setIsVideoExist(false)}
        onConfirm={handleStartCalibration}
        loading={isConfirm}
      />
      {isEyeTracking ? (
        <Button size={"md"} color={'white'} bg={'purple.100'} variant={"white-solid"} onClick={handleEyeTracking}>
          Eye Tracking
        </Button>
      ) : null}
    </Box>
  );
};

export default EyeTrackingButton;
