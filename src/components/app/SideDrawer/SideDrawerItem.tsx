import { HStack, Text, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

interface SideDrawerItemProps {
  href: string;
  label: string;
  icon?: IconType;
  onClose: () => void;
}

const SideDrawerItem = ({
  href,
  label,
  icon,
  onClose,
}: SideDrawerItemProps) => {
  const router = useRouter();
  const isActive = router.pathname.startsWith(href);

  return (
    <NextLink href={href} passHref>
      <HStack
        p={4}
        onClick={onClose}
        color={isActive ? "brand.300" : undefined}
        fontSize="xl"
        role="group"
        cursor="pointer"
        rounded="lg"
        _hover={{
          bg: "brand.300",
          color: "white",
        }}
      >
        {icon && <Icon as={icon} />}
        <Text>{label}</Text>
      </HStack>
    </NextLink>
  );
};

export default SideDrawerItem;
