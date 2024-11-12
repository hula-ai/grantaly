// gazecloudapi.d.ts
interface Window {
    GazeCloudAPI: {
      StartEyeTracking: () => void;
      StopEyeTracking: () => void;
      OnCamDenied: () => void;
      OnCalibrationComplete: () => void;
      OnResult: (e:any) => void;
      // Add other methods from the GazeCloudAPI if needed
    };
  }
  