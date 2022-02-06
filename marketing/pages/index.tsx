import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Stack,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { BeautyText } from "../components/BeautyText";
import { FeatureBlock } from "../components/Feature";
import { HeaderFeatureBlock } from "../components/HeaderFeatureBlock";
import { Logo } from "../components/Logo";

const Home: NextPage = () => {
  return (
    <div>
      <Flex
        bgColor="white"
        boxShadow="sm"
        position="sticky"
        top="0"
        zIndex="200"
        w="100%"
        px="4"
        py="2"
        align="center"
      >
        <Logo />
        <Spacer />
        <HStack display={{ base: "none", md: "flex" }} spacing="5">
          <Button
            as="a"
            size="sm"
            variant="link"
            color="blackAlpha.900"
            href="https://twitter.com/bankofthingsdao"
          >
            Twitter
          </Button>
          <Button
            as="a"
            size="sm"
            backgroundColor="blackAlpha.900"
            color="white"
            colorScheme="blackAlpha"
            rounded="full"
            paddingInline="3"
            href="https://app.bankofthings.com/"
          >
            Open App
          </Button>
        </HStack>
      </Flex>
      <HeaderFeatureBlock />
      <VStack mt="12" spacing="12" w="100%" px={{ base: "20px", md: "90px" }}>
        <FeatureBlock
          icon="🪄"
          title={
            <span>
              Team up <BeautyText gradient="red">with ease</BeautyText>
            </span>
          }
          description="Connect DAO members, NFT owners, token holders so you can move as one and achieve goals."
          video="https://cleanshot-cloud-fra.accelerator.net/media/26747/qbu3Yngei0uBm98NOXvL5s4Hzjx9vO79vrlIWk8V.mp4"
        />
        <FeatureBlock
          icon="👩‍💻"
          title={
            <span>
              <BeautyText gradient="yellow">Granular</BeautyText> access control
            </span>
          }
          description={
            <p>
              Set access conditions from the simplest to the most complex. No
              code.
            </p>
          }
          items={[
            {
              name: "",
              image:
                "https://bankofthings.nyc3.cdn.digitaloceanspaces.com/landingFilters.jpg",
            },
          ]}
        />

        <FeatureBlock
          icon="🤝"
          title={
            <span>
              Build <BeautyText gradient="yellow">workflows</BeautyText>
            </span>
          }
          description="Grant edit permissions in Notion to DAO members; Allow pull requests and AWS access to NFT owners; Join Zoom depending on the number of tokens."
          items={[
            {
              name: "",
              image:
                "https://bankofthings.nyc3.cdn.digitaloceanspaces.com/landingwf.jpeg",
            },
          ]}
        />
        <Stack
          direction={{ base: "column", md: "row" }}
          w="100%"
          minH="200px"
          py="50px"
        >
          <Box mb={4}>
            <Logo />
          </Box>
          <Spacer />
          <VStack align={{ base: "flex-start", md: "flex-end" }}>
            <a href="https://twitter.com/bankofthingsdao">Twitter</a>
            <a href="mailto:hello@toola.so">team@bankofthings.com</a>
          </VStack>
        </Stack>
      </VStack>
    </div>
  );
};

export default Home;
