import React from 'react';
import { Link, Box, Flex, Text, Button, Stack, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Image, useBreakpointValue, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import airbnbLogo from '../assets/airbnb.svg'
import airbnbIcon from '../assets/airbnb-icon.svg'

const NavBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const imageSrc = useBreakpointValue({
    base: airbnbIcon,
    sm: airbnbLogo,
  });

  return (
    <NavBarContainer {...props}>
      <Image src={imageSrc} alt='Logo' height="25px" />
      <IconButton
        display={{ base: 'block', md: 'none' }}
        variant='ghost'
        onClick={onOpen}
        icon={<HamburgerIcon />}
      />
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='xs'>
        <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>Logo</DrawerHeader>
            <DrawerBody>
              {/* hi */}
              <MenuLink to="/">View Listings</MenuLink>
              <MenuLink to="/my-listings">My Listings</MenuLink>
              <MenuLink to="/login">
                <Button
                  size="sm"
                  rounded="md"
                >
                  Login
                </Button>
              </MenuLink>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      <MenuLinks />
    </NavBarContainer>
  );
};

const MenuLink = ({ children, to = '/' }) => {
  return (
    <Link href={to}>
      <Text display="block">
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = () => {
  return (
    <Box display={{ base: 'none', md: 'block' }}>
      <Stack
        spacing={4}
        // align="center"
        justify='flex-end'
        direction='row'
        pt={2}
      >
        <MenuLink to="/">View Listings</MenuLink>
        <MenuLink to="/my-listings">My Listings</MenuLink>
        <MenuLink to="/login" isLast>
          <Button
            size="sm"
            rounded="md"
          >
            Login
          </Button>
        </MenuLink>
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      px={{ base: '4', md: '8' }}
      py={4}
      position='fixed'
      zIndex={400}
      bg={'white'}
    >
      {children}
    </Flex>
  );
};

export default NavBar;
