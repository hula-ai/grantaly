import { Assignee, FileUrl, UserObject, VideoState } from "@/types/type";
import { Box, Button, useToast } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import VideoModal from "../VideoModal/VideoModal";
import { useSession } from "next-auth/react";
import DataLoader from "../DataLoader/DataLoader";
import { useDispatch, useSelector } from "@/app/redux/store";
import { setVideosDetails } from "@/app/redux/slices/video";
import DraggingBox from "../VideoModal/DraggingBox";
import { handleGetMode } from "@/helper/mode";
import { Mode } from "@/types/enum";
import { handleOpenToast } from "@/helper/toast";
import { urlToFile } from "@/helper/upload";

const VideoButton = () => {
  const toast = useToast();
  const { data: token, status } = useSession();

  const [videos, setVideos] = useState<VideoState | null>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(false);
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!token) {
      setIsModalOpen(true);
      return;
    }
    if (videos?.currentUserVideo) {
      handleConvert(videos?.currentUserVideo);
    } else {
      setIsModalOpen(true);
    }
  };
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const getVideos = async () => {
        try {
          const response = (await axios.get(`/api/user/${id}/video/`)).data;
          const currentUserVideo =
            (handleGetMode() === Mode.TEACHER &&
              response.data.teacher.find((item: Assignee) => {
                return item?._id === token?.user._id;
              })) ||
            (handleGetMode() === Mode.STUDENT &&
              response.data.student.find((item: Assignee) => {
                return item?._id === token?.user._id;
              }));

          const videos = {
            teacher: response.data.teacher,
            student: response.data.student,
            currentUserVideo,
          };
          dispatch(setVideosDetails(videos));
          setVideos(videos);
        } catch (error) {
          console.error("Error fetching videos:", error);
        }
      };
      getVideos();
    }
  }, [id]);

  const handleConvert = async (data: Assignee) => {
    if (data.videos.length > 0 && data.videos[0].isConverted === false) {
      setVideoLoading(true);
      try {
        const convertPython = await axios({
          method: "PUT",
          url: "/api/python-script",
          data: { video: data.videos[0] },
        });
        if (convertPython.data.data) {
          console.log("convertPython.data.data", convertPython.data.data);

          setVideos((prev: VideoState | null) => {
            if (!prev || !prev.currentUserVideo) {
              return prev;
            }
            const { currentUserVideo } = prev;

            return {
              ...prev,
              currentUserVideo: {
                ...currentUserVideo,
                videos: [
                  {
                    ...convertPython?.data?.data,
                    isConverted: true,
                  },
                ],
              },
            };
          });
        }
        setIsModalOpen(true);

        setVideoLoading(false);
      } catch (err: any) {
        console.log("err", err);
        const errMsg = err?.response?.data.message;

        setVideoLoading(false);
        // throw new Error("Python script failed")
        handleOpenToast(errMsg ?? "Something went wrong", "error", toast);
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {!videos ? null : videos &&
        (videos?.teacher.length > 0 || videos?.student.length > 0) ? (
        <>
          <Button size={"md"} variant={"white-solid"} onClick={openModal}>
            View Video
          </Button>
          {videoLoading ? <DataLoader /> : null}
          <VideoModal
            data={videos}
            isOpen={isModalOpen}
            setVideos={setVideos}
            onClose={closeModal}
          />
        </>
      ) : null}
    </>
  );
};

export default VideoButton;
