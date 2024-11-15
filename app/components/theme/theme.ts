// import { background, border, extendTheme } from "@chakra-ui/react";
// const colors = {
//   brand: {
//     900: "#1a365d",
//     800: "#153e75",
//     700: "#2a69ac",
//   },
//   black: {
//     200: "#111",
//   },
//   white: {
//     200: "#f7fafc33",
//     300: "#FDFDFD",
//     400: "#F3F4F5",
//   },
//   gray: {
//     100: "#BBBBC7",
//     200: "#09514C05",
//     300: "#4A4A4A",

//     900: "#848385",
//   },
//   purple: {
//     100: "#78206E",
//   },
// };
// const components = {
//   Heading: {
//     variants: {
//       h1: {
//         fontSize: ["25px", "25px", "25px", "40px", "40px", , "40px"],
//         color: "gray.900",
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontWeight: 600,
//       },
//       h3: {
//         fontSize: ["25px", "25px", "25px", "25px", "25px", , "25px"],
//         color: "gray.900",
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontWeight: 600,
//         margin: 0,
//       },
//       h2: {
//         fontSize: ["20px", "20px", "20px", "25px", "25px", , "25px"],

//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontWeight: 600,
//       },

//       h4: {
//         fontSize: "30px",

//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontWeight: 600,
//       },
//     },
//   },

//   Text: {
//     variants: {
//       p1: {
//         fontWeight: 400,
//         // lineHeight: ["22px", "22px", "25px", "25px", "25px", "25px"],
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontSize: ["14px", "14px", "14px", "16px", "16px", "16px"],
//         margin: "0px",
//       },
//       p2: {
//         fontWeight: 400,
//         // lineHeight: ["22px", "22px", "25px", "25px", "25px", "25px"],
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontSize: "13px",
//         margin: "0px",
//       },
//       "link-variant": {
//         margin: 0,
//         fontWeight: 650,
//         fontSize: "15px",
//         color: "black",
//       },
//       p4: {
//         fontWeight: 400,
//         color: "black.200 ",
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontSize: ["13px", "14px", "14px"],

//         lineHeight: "23px",
//       },
//     },
//   },
//   Link: {
//     variants: {
//       link: {
//         fontWeight: 400,
//         // lineHeight: ["22px", "22px", "25px", "25px", "25px", "25px"],
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontSize: ["14px", "14px", "14px", "16px", "16px", "16px"],
//         margin: "0px",
//       },
//     },
//   },

//   Checkbox: {
//     variants: {
//       "gray-checkbox": {
//         borderColor: "red",
//         "& .chakra-checkbox__control": {
//           border: "1px solid red",
//           borderColor: "red",
//         },
//       },
//     },
//   },
//   Input: {
//     variants: {
//       "bg-input": {
//         field: {
//           height: "40px",
//           borderRadius: "4px",
//           color: "black.200",
//           bg: "gray.200 !important",
//           border: "none ",
//           _placeholder: {
//             color: "gray.100",
//             fontWeight: 400,
//             fontSize: "13px",
//           },
//         },
//       },
//       "input-variant": {
//         // py:'20px',
//         // borderColor: 'gray',
//         // borderBottom='1px solid gray',
//       },
//     },
//   },
//   FormLabel: {
//     variants: {
//       label: {
//         color: "gray.300",
//         fontSize: "14px",
//         fontFamily: "var(--chakra-\fonts-openSans)",
//         fontWeight: 400,
//       },
//       "button-form-label": {
//         borderRadius: "4px",
//         bg: "white",
//         border: "none",
//         outline: "none",

//         width: "max-content",
//         p: "7px 20px",
//         fontSize: "16px",
//       },
//       simple: {
//         bg: "gray.900",
//         color: "white",
//       },
//     },
//   },
//   Button: {
//     variants: {
//       "white-solid": {
//         borderRadius: "10px",
//         bg: "white",
//         border: "none",
//         outline: "none",
//         width: "max-content",
//         px: "25px",
//         fontSize: "16px",
//       },
//       simple: {
//         bg: "gray.900",
//         color: "white",
//       },
//       // ""
//     },
//   },
//   Table: {
//     variants: {
//       "custom-table": {
//         table: {
//           borderCollapse: "separate",
//           bg: "white",
//           // backgroundColor: "#fff",
//           // padding: "10px 0px",
//           tbody: {
//             bg: "white",

//             tr: {
//               // position: "relative",
//               // top: "-21px",

//               bg: "white",

//               // marginBottom:'20px',

//               verticalAlign: "middle",
//               boxShadow: " 0px 2px 15px 0px rgba(0, 0, 0, 0.06)",
//               border: "1px solid ",
//               borderColor: "gray.500",

//               td: {
//                 padding: "12px",
//                 // fontSize: "15px",
//                 // marginBottom:'20px',
//                 fontSize: { md: "14px", base: "15px" },

//                 fontWeight: 400,
//                 color: "gray.900",

//                 a: {
//                   color: "gray.900",
//                 },
//               },
//             },
//           },
//           thead: {
//             tr: {},
//             bg: "white",
//             th: {
//               p: "23px",
//               fontSize: "15px",
//               position: "relative",
//               fontWeight: 600,

//               "& .vertical-divider": {
//                 position: "absolute",
//                 top: { md: "21px", base: "16px" },
//                 left: { md: "12px", base: "10px" },
//                 width: "1px",
//                 height: { md: "16px", base: "17px" },
//                 zIndex: 99,
//                 backgroundColor: "#fff",
//                 // border: "1px solid red",
//               },
//               textTransform: "capitalize",

//               color: "black",
//             },
//           },
//         },
//       },
//       custom: {
//         table: {
//           Thead: {
//             tr: {
//               "&:first-of-type th:first-of-type": {
//                 borderTopLeftRadius: "10px",
//               },
//               "&:first-of-type th:last-of-type": {
//                 borderTopRightRadius: "10px",
//               },
//             },
//           },
//           Tbody: {

//             tr: {
//               "&:last-of-type td:first-of-type": {
//                 borderBottomLeftRadius: "10px",
//               },
//               "&:last-of-type td:last-of-type": {
//                 borderBottomRightRadius: "10px",
//               },
//             },
//             "& tr:nth-of-type(odd) td": {
//               backgroundColor: "#78206e1a",
//             },
//             "& tr:nth-of-type(even) td": {
//               backgroundColor: "white",
//             },
//           },
//         },
//       },
//     },
//   },
// };

// const theme = extendTheme({ colors, components });
// export { theme };

