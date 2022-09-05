import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggler = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="brand-outline"
      fontSize="lg"
      aria-label="theme-toggler"
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
    />
  );
};
export default ThemeToggler;
