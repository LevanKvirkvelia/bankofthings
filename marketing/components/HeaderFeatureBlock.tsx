import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BeautyText } from "./BeautyText";

// const StyledHeading = styled.h1`
//   font-size: 35px;
//   font-weight: 800;
//   line-height: 40px;
//   margin-bottom: 20px;
//   text-align: center;

//   @media screen and (min-width: 900px) {
//     & {
//       text-align: left;
//       font-size: 65px;
//       font-weight: 800;
//       letter-spacing: -1.5px;
//       line-height: 70px;
//       margin-bottom: 20px;
//     }
//   }
// `;

export function HeaderFeatureBlock() {
  return (
    <Flex
      mb="6"
      w="100%"
      minH={{ base: "70vh", md: "90vh" }}
      bgImage={{
        base: undefined,
        md: "https://bankofthings.nyc3.cdn.digitaloceanspaces.com/bg.png",
      }}
      bgColor="#f4f4f4"
      bgSize="cover"
      bgRepeat="no-repeat"
      justify={{ base: "center", md: "flex-start" }}
      flexDirection={{ base: "column-reverse", md: "row" }}
    >
      <VStack
        px={{ base: "20px", md: "90px" }}
        maxW="container.md"
        align={{ base: "center", md: "flex-start" }}
        justify="center"
        spacing="4"
      >
        <Heading
          as="h1"
          w="100%"
          fontWeight="800"
          fontSize={{ base: "50px", md: "74px" }}
          letterSpacing={{ base: undefined, md: "-1.5px" }}
          lineHeight={{ base: "50px", md: "75px" }}
        >
          <BeautyText>Token gated access to Notion</BeautyText>
        </Heading>
        <Text fontSize="24px">
          Share access to Web2 services with NFT owners, DAO members or create
          your own blockchain requirements.
        </Text>
        <HStack w="100%">
          <Button
            as="a"
            size="lg"
            backgroundColor="blackAlpha.900"
            color="white"
            colorScheme="blackAlpha"
            href="https://app.bankofthings.com/"
          >
            Get started →
          </Button>
          <Button
            as="a"
            href="https://app.bankofthings.com/playground"
            size="lg"
            colorScheme="purple"
            variant="outline"
          >
            Playground
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}
