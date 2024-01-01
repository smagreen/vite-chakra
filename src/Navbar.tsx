import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth } from './AuthProvider';

const Links = ['Dashboard', 'Analytics', 'Admin', 'About'];

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <ChakraLink as={ReactRouterLink}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('purple.200', 'purple.700'),
    }}
    to={to}>
    {children}
  </ChakraLink>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token, onLogin, onLogout } = useAuth();

  return (
    <Box bg={useColorModeValue('purple.100', 'purple.900')} px={4} 
        position="fixed"
        top={0}
        width="full"
        zIndex={10}
        >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}>
            <NavLink key="home" to="/">Home</NavLink>
            {Links.map((link) => (
              <NavLink key={link} to={link.toLocaleLowerCase()}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          {/* Other elements like buttons or profile avatar */}
          {!token && <button onClick={onLogin}> Login</button>}
          {/* {!token && <NavLink key={'signin'} to={'signin'}>Sign in</NavLink>} */}
          {token && <button onClick={onLogout}>Sign out {token.name}</button>}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link} to={link.toLowerCase()}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}
