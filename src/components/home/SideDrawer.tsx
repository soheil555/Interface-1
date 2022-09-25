import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  DrawerFooter,
  useBreakpointValue,
} from '@chakra-ui/react'
import { getLinks } from './Header'
import NextLink from 'next/link'
import { useEffect } from 'react'

interface TopDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const SideDrawer = ({ isOpen, onClose }: TopDrawerProps) => {
  const isDrawerOpen = useBreakpointValue({ base: isOpen, lg: false }) || false

  useEffect(() => {
    if (!isDrawerOpen) {
      onClose()
    }
  }, [isDrawerOpen, onClose])

  return (
    <Drawer
      isOpen={isDrawerOpen}
      size="full"
      placement="left"
      onClose={onClose}
      preserveScrollBarGap={true}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody mt={20}>
          <VStack align="stretch" fontSize={22} gap={5}>
            {getLinks()}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <NextLink href="/app/swap">
            <Button w="full" rounded="full" variant="brand">
              Launch App
            </Button>
          </NextLink>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default SideDrawer
