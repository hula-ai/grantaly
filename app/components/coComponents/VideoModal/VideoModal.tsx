import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Assignee, FileUrl, UserObject, VideoState } from "@/types/type";
import { useSession } from "next-auth/react";
import DataLoader from "../DataLoader/DataLoader";
import Loader from "../Loader/Loader";
import axios from "axios";

import ReactSingleSelect from "../react-async-multi-select/ReactSingleSelect";
import { Role } from "@/utils/constant";
import DraggingBox from "./DraggingBox";
import { handleGetMode } from "@/helper/mode";
import { Mode } from "@/types/enum";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  setVideos: Dispatch<SetStateAction<VideoState | null>>;
  data: VideoState;
}
interface ButtonProps {
  onClose: () => void;
  handleApprove: () => void;
  handleReject: () => void;
  rejectLoading: boolean;
  approveLoading: boolean;
}

const Buttons: React.FC<ButtonProps> = ({
  handleApprove,
  handleReject,
  rejectLoading,
  approveLoading,
  onClose,
}) => {
  return (
    <Box display={"flex"} gap={"20px"}>
      <Button
        isLoading={approveLoading}
        colorScheme="blue"
        onClick={() => {
          // Approval Code
          handleApprove();
        }}
        width={"120px"}
      >
        Approve
      </Button>
      <Button
        isLoading={rejectLoading}
        colorScheme="red"
        onClick={() => {
          // Rejection Code
          handleReject();
        }}
        width={"120px"}
      >
        Reject
      </Button>
    </Box>
  );
};

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  data,
  setVideos,
}) => {
  const { data: token, status } = useSession();
  const [selectedTeacher, setSelectedTeacher] = useState<Assignee | null>(null);


  const [loading, setLoading] = useState({
    reject: false,
    approve: false,
  });
  const handleApprove = async (id: string) => {
    setLoading((prev) => ({ ...prev, approve: true }));
    try {
      const updateVideo = await axios({
        method: "PUT",
        url: `/api/user/${id}/video/`,
      });
      if (updateVideo.data.success) {
        setVideos((prev: VideoState | null) => {
          if (!prev || !prev.currentUserVideo) {
            return null;
          }
          const { currentUserVideo } = prev;

          return {
            ...prev,
            currentUserVideo: {
              ...currentUserVideo,
              videos: updateVideo.data.data.videos,
            },
          };
        });

        setLoading((prev) => ({ ...prev, approve: false }));
      }

      console.log("updateVideo", updateVideo);
    } catch (error) {
      setLoading((prev) => ({ ...prev, approve: false }));
    }
  };
  const handleReject = async (id: string) => {
    setLoading((prev) => ({ ...prev, reject: true }));
    try {
      const deleteVideo = await axios({
        method: "DELETE",
        url: `/api/user/${id}/video/`,
      });
      if (deleteVideo.data.success) {
        setLoading((prev) => ({ ...prev, reject: false }));
      }
      onClose();

      if (deleteVideo.status == 200) {
      }
      setVideos((prev: VideoState | null) => {
        if (!prev) {
          return null;
        }
        const roleFinder = Object.keys(data).find((item) => handleGetMode() === item);
      
        return {
          ...prev,
          currentUserVideo: null,
          [`${roleFinder}`]: [],
        };
      });
    } catch (error) {
      setLoading((prev) => ({ ...prev, reject: false }));
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size={"2xl"}
      isCentered
      scrollBehavior="inside"
    >
      {/* <ModalOverlay /> */}

      <ModalContent backgroundColor={"transparent"}>
        <DraggingBox>
          <Box
            bg={"white"}
            maxH={"600px"}
            overflowY={"scroll"}
            borderRadius={"10px"}
          >
            <ModalCloseButton />
            <ModalBody>
              <Box
                padding={"1rem"}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
                {data.currentUserVideo &&
                data?.currentUserVideo?.videos?.length > 0 ? (
                  <Box>
                    <Heading
                      margin={0}
                      marginBottom={"10px"}
                      size="lg"
                      color={"black"}
                    >
                      {token?.user?.name}
                    </Heading>

                    <Box>
                      <video
                        controls
                        width="100%"
                        style={{
                          marginBottom: "10px",
                          maxWidth: "100%",
                          // height:"300px",
                          borderRadius: "5px",
                        }}
                      >
                        <source
                          src={data?.currentUserVideo?.videos[0].url}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </Box>
                    {data.currentUserVideo &&
                    !data.currentUserVideo?.videos[0]?.isApproved ? (
                      <Buttons
                        handleApprove={() => {
                          if (data?.currentUserVideo?.videos) {
                            handleApprove(
                              data?.currentUserVideo?.videos[0]._id
                            );
                          }
                        }}
                        handleReject={() => {
                          if (data.currentUserVideo?.videos) {
                            handleReject(data.currentUserVideo?.videos[0]._id);
                          }
                        }}
                        rejectLoading={loading.reject}
                        approveLoading={loading.approve}
                        onClose={onClose}
                      />
                    ) : null}
                  </Box>
                ) : null}
                {!token || handleGetMode() === Mode.STUDENT ? (
                  <>
                    <Box>
                      <ReactSingleSelect
                        value={selectedTeacher}
                        placeholder="Select Teacher"
                        optionList={data.teacher}
                        selectData={(e: Assignee) => setSelectedTeacher(e)}
                      />
                    </Box>
                    {!selectedTeacher ? (
                      <Box
                        boxShadow={"lg"}
                        borderRadius={"10px"}
                        border={"1px solid"}
                        borderColor={"gray.900"}
                        minH={"300px"}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Heading variant={"h4"}>Watch Teacher Video</Heading>
                      </Box>
                    ) : null}
                    {selectedTeacher && selectedTeacher?.videos?.length > 0 ? (
                      <Box>
                        <Heading
                          margin={0}
                          marginBottom={"10px"}
                          size="lg"
                          color={"black"}
                        >
                          {selectedTeacher.name}
                        </Heading>

                        <Box>
                          <video
                            controls
                            width="100%"
                            style={{
                              marginBottom: "10px",
                              maxWidth: "100%",
                              // height:"300px",
                              borderRadius: "5px",
                            }}
                          >
                            <source
                              src={selectedTeacher?.videos[0].url}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        </Box>
                      </Box>
                    ) : null}
                  </>
                ) : null}
                {handleGetMode() === Mode.TEACHER &&
                  data?.student?.length > 0 && (
                    <Box>
                      <Heading
                        margin={0}
                        marginBottom={"10px"}
                        size="md"
                        color={"black"}
                      >
                        Students
                      </Heading>
                      <Box>
                        {data?.student?.map((video: Assignee) => {
                          return video?.videos?.map(
                            (item: FileUrl, idx: number) => {
                              return (
                                <Box key={idx}>
                                  <Heading
                                    margin={0}
                                    marginBottom={"10px"}
                                    size="sm"
                                    color={"gray.900"}
                                  >
                                    {video._id === token?.user._id
                                      ? "You"
                                      : video.name}
                                  </Heading>
                                  <video
                                    key={idx}
                                    controls
                                    width="100%"
                                    style={{
                                      marginBottom: "10px",
                                      maxWidth: "100%",
                                      // height:"300px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <source src={item.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                  {video._id === token?.user._id &&
                                  !item?.isApproved ? (
                                    <Buttons
                                      handleApprove={() =>
                                        handleApprove(item._id)
                                      }
                                      handleReject={() =>
                                        handleReject(item._id)
                                      }
                                      rejectLoading={loading.reject}
                                      approveLoading={loading.approve}
                                      onClose={onClose}
                                    />
                                  ) : null}
                                </Box>
                              );
                            }
                          );
                        })}
                      </Box>
                    </Box>
                  )}
              </Box>
            </ModalBody>
          </Box>
        </DraggingBox>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
