import { Box, Heading, Text } from "@chakra-ui/react";

export const Header = () => (
    <Box pb="28" as="section" alignItems="center">
      <Box
        color='gray.50'
        bg='purple.600'
        pt='148px'
        pb='28'
        px='8'
        textAlign='center'
    >
    <Heading fontWeight='extrabold' fontSize={['3xl','3xl','5xl']} textAlign={['left','left','center']}>
      Simple pricing for your business
    </Heading>
    <Text fontWeight='medium' fontSize={['sm','lg','2xl']} pt='4' textAlign={['left','left','center']}>
      Plans that are carefully crafted to suit your business.
    </Text>
   </Box>
  </Box>
);