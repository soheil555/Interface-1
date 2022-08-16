import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import MetaMaskConnect from "../Web3/MetaMaskConnect";
import { appRoutes } from "../../../routes";
import SideDrawerItem from "./SideDrawerItem";

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

          <DrawerBody>
            <VStack mt={12} align="stretch" gap={3}>
              {appRoutes.map((route) => (
                <SideDrawerItem
                  key={route.label}
                  href={route.href}
                  label={route.label}
                  icon={route.icon}
                  onClose={onClose}
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter justifyContent="center">
            <MetaMaskConnect />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
