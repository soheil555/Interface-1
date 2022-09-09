import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggler = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      variant="brand-solid"
      rounded="full"
      fontSize="lg"
      aria-label="theme-toggler"
      border="0.1px solid"
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
    />
  );
};
export default ThemeToggler;
