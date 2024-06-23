import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

type MediaQueryOptions = {
  breakpoint: Breakpoint;
  direction: "up" | "down";
};

const useResponsive = ({
  breakpoint,
  direction,
}: MediaQueryOptions): boolean => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints[direction](breakpoint));
  return matches;
};

export default useResponsive;
