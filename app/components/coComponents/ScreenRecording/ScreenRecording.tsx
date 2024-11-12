// import React from "react";
// import { PuppeteerScreenRecorder } from "puppeteer-screen-recorder";
// import puppeteer from "puppeteer";
// import { Box, Button } from "@chakra-ui/react";
// const ScreenRecording = () => {
//   const handleStart = async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     const recorder = new PuppeteerScreenRecorder(page);
//     await recorder.start("/public/simple.mp4"); // supports extension - mp4, avi, webm and mov

//     await recorder.stop();
//     setTimeout(async () => {
//       await recorder.stop();
//     }, 5000);
//     // await browser.close();
//   };

//   return (
    
//       <Button onClick={handleStart} variant={"white-solid"}>Start</Button>
    
//   );
// };

// export default ScreenRecording;
import React from 'react'

const ScreenRecording = () => {
  return (
    <div>
      
    </div>
  )
}

export default ScreenRecording
