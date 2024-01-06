import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Icon,
    Stack,
    StackProps,
    Text,
  } from '@chakra-ui/react';
  import { CheckIcon } from './icons/Icons';
  
  const ListItem = (props: StackProps) => {
    const { children, ...rest } = props;
    return (
      <HStack as='li' spacing='20px' {...rest} alignItems="start">
        <Icon as={CheckIcon} w='22px' h='22px' />
        <Text textAlign={['left','left','left']}>{children}</Text>
      </HStack>
    );
  };
  
  export function Pricing() {
    return (
      <Box mx="6">
        <Box
          maxW='994px'
          margin='auto'
          mt='-160px'
          borderRadius='12px'
          overflow='hidden'
          boxShadow='0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
          textAlign='center'
        >
          <Flex direction={['column', 'column', 'row']}>
            <Box bg='#F0EAFB' p='60px'>
              <Text fontSize='24px' fontWeight='800'>
                Professional
              </Text>
              <Heading as='h3' fontSize={['5xl','5xl','6xl']}  mt='16px'>
                £399
              </Heading>
              <Text color='#171923' fontSize='18px' fontWeight='500' mt='8px'>
                billed when we feel like it
              </Text>
              <Button colorScheme='purple' size='lg' w='282px' mt='24px'>
                Get Started
              </Button>
            </Box>
            <Box p='60px' fontSize='18px' bg='white'>
              <Text textAlign='left'>
                Access these exciting features when you sign up for our professional package.
              </Text>
              <Stack as='ul' spacing='20px' pt='24px'>
                <ListItem>Features available elsewhere for free</ListItem>
                <ListItem>Premium features (at additional cost)</ListItem>
                <ListItem>Daily spam</ListItem>
                <ListItem>24/7 Support bot </ListItem>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Box>
    );
  }
  