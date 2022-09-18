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
  Box,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import MetaMaskConnect from '../Web3/MetaMaskConnect'
import { appRoutes } from '../../../routes'
import SideDrawerItem from './SideDrawerItem'
import { useEffect } from 'react'

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isModalOpen = useBreakpointValue({ base: isOpen, lg: false }) || false

  useEffect(() => {
    if (!isModalOpen) {
      onClose()
    }
  }, [isModalOpen, onClose])

  return (
    <Box display={{ base: 'block', lg: 'none' }}>
      <IconButton
        onClick={onOpen}
        fontSize="2xl"
        variant="unstyled"
        aria-label="hamburger"
        icon={<HamburgerIcon />}
      />
      <Drawer
        size="full"
        isOpen={isModalOpen}
        placement="left"
        onClose={onClose}
        preserveScrollBarGap={true}
      >
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

          <DrawerFooter justifyContent="flex-start">
            <MetaMaskConnect />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default SideDrawer
