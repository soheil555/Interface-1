import { useColorMode, useColorModeValue, Switch, Box } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeToggler = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <Box position="relative">
      <SunIcon
        pointerEvents="none"
        position="absolute"
        zIndex={1}
        top={1.5}
        left={1}
        display={useColorModeValue("none", "inline")}
      />
      <Switch
        colorScheme="brand"
        size="lg"
        isChecked={useColorModeValue(false, true)}
        onChange={toggleColorMode}
      />
      <MoonIcon
        pointerEvents="none"
        position="absolute"
        zIndex={1}
        top={1.5}
        right={1}
        display={useColorModeValue("inline", "none")}
      />
    </Box>
  );
};
export default ThemeToggler;
