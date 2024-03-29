import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import airbnbIcon from '../assets/airbnb-icon.svg'
import airbnbLogo from '../assets/airbnb.svg'
import { AuthContext } from './AuthProvider';

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
}

const NavBar = (props) => {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();
  const {
    isLoggedIn,
    logOut
  } = useContext(AuthContext);

  const imageSrc = useBreakpointValue({
    base: airbnbIcon,
    sm: airbnbLogo,
  });

  return (
    <NavBarContainer {...props}>
      <Link href='/'>
        <Image src={imageSrc} alt='Logo' height='28px'/>
      </Link>
      <IconButton
        display={{
          base: 'block',
          md: 'none'
        }}
        variant='ghost'
        onClick={onOpen}
        height='32px'
        icon={<HamburgerIcon/>}
        aria-label='menu'/>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size='xs'>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader>
            <Link href='/'>
              <Image src={airbnbLogo} alt='Logo' height='28px'/>
            </Link>
          </DrawerHeader>
          <DrawerBody>
            <MenuLink to='/' py='2' fontWeight='semibold' width='100%'>Home</MenuLink>
            <MenuLink to='/my-listings' py='2' fontWeight='semibold' width='100%'>My Listings</MenuLink>
            {
              isLoggedIn
                ? <MenuLink to='/' py='2'>
                  <Button
                    size='sm'
                    rounded='md'
                    bg='red.400'
                    color='white'
                    width='100%'
                    _hover={{ bg: 'red.600' }}
                    onClick={logOut}
                  >
                    Sign Out
                  </Button>
                </MenuLink>
                : <MenuLink to='/login' py='2'>
                  <Button
                    size='sm'
                    rounded='md'
                    bg='black'
                    color='white'
                    width='100%'
                    _hover={{ bg: 'gray.600' }}
                  >
                    Sign In
                  </Button>
                </MenuLink>
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <MenuLinks/>
    </NavBarContainer>
  );
};

const MenuLink = ({
  children,
  to = '/',
  ...rest
}) => {
  return (
    <Link href={to}>
      <Text display='flex' {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = () => {
  return (
    <Box display={{
      base: 'none',
      md: 'block'
    }}>
      <Stack
        spacing={5}
        align='center'
        justify='flex-end'
        direction='row'
      >
        <MenuLink to='/' fontSize='md' fontWeight='semibold'>Home</MenuLink>
        <MenuLink to='/my-listings' fontSize='md' fontWeight='semibold'>My Listings</MenuLink>
        {
          localStorage.getItem('token')
            ? <MenuLink to='/'>
              <Button
                size='sm'
                rounded='md'
                bg='red.400'
                color='white'
                _hover={{ bg: 'red.600' }}
                onClick={logout}
              >
                Sign Out
              </Button>
            </MenuLink>
            : <MenuLink to='/login'>
              <Button
                size='sm'
                rounded='md'
                bg='black'
                color='white'
                _hover={{ bg: 'gray.600' }}
              >
                Sign In
              </Button>
            </MenuLink>
        }
      </Stack>
    </Box>
  );
};

const NavBarContainer = ({ children }) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      p={4}
      position='fixed'
      zIndex={400}
      bg={'white'}
      borderBottomColor='gray.200'
      borderBottomWidth='1px'
    >
      {children}
    </Flex>
  );
};

export default NavBar;
