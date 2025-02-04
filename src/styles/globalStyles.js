import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const temp = screenWidth / 2;
const squareSize = temp - screenWidth * 0.06;

export const globalStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#FFC0CB", // Light pink color #FFE5EF FFC0CB
    flex: 1,
  },
  container: {
    margin: "4%",
    marginTop: 0,
    padding: "2%",
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#FFE5B4",
    backgroundColor: "#FFCCCC",
  },
});

export const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "4%", // Compensate for margins
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  square: {
    width: squareSize, // Explicit width
    height: squareSize, // Explicit height (same as width)
    marginRight: "2%", // Horizontal gap
    marginBottom: "2%", // Vertical gap
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center", // Internal padding (doesn’t affect width/height)
  },
  // Remove marginRight for the 2nd square in each row
  lastSquareInRow: {
    marginRight: 0,
  },
  image: {
    width: "50%", // Relative to square size
    height: "50%",
    resizeMode: "contain", // Prevent image stretching
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    height: "25%",
    paddingTop: "5%",
  },
  subText: {
    fontSize: 12,
    color: "gray",
    paddingTop: "10%",
  },
});
