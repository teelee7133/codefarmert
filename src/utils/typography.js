import Typography from "typography"


const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: [
    "share-tech-mono",
    "mono",
  ],
  bodyFontFamily: ["share-tech-mono", "nono"],
})


// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
