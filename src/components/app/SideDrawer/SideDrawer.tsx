import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MetaMaskConnect from "../Web3/MetaMaskConnect";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isModalOpen = useBreakpointValue({ base: isOpen, lg: false }) || false;
  return (
    <>
      <IconButton
        onClick={onOpen}
        display={{ base: "block", lg: "none" }}
        fontSize="2xl"
        variant="unstyled"
        aria-label="hamburger"
        icon={<HamburgerIcon />}
      />
      <Drawer size="xs" isOpen={isModalOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody></DrawerBody>

          <DrawerFooter justifyContent="center">
            <MetaMaskConnect />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
