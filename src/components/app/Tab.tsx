import { Text, VStack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import type { IconType } from "react-icons";

interface TabProps {
  href: string;
  label: string;
  icon?: IconType;
}

const Tab = ({ href, label, icon }: TabProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <NextLink href={href} passHref>
      <Text
        cursor="pointer"
        role="group"
        color={isActive ? "brand.300" : undefined}
        variant="gray"
        fontSize="xl"
      >
        <VStack>
          {icon && <Icon as={icon} />}
          <Text _groupHover={{ color: "brand.300" }}>{label}</Text>
        </VStack>
      </Text>
    </NextLink>
  );
};

export default Tab;
