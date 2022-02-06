import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode, useMemo, useState } from "react";

type FeatureItem = {
  title: ReactNode | string;
  icon: ReactNode | string;
  description: ReactNode | string;
  video?: string;
  image?: string;
};

function RenderVideoOrImage({
  video,
  image,
  active,
}: { active: boolean } & Partial<FeatureItem>) {
  if (image)
    return (
      <img
        src={image}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          top: 0,
          left: 0,
          position: "absolute",
          overflow: "hidden",
          display: active ? "block" : "none",
        }}
      />
    );
  if (video?.includes("mp4"))
    return (
      <video
        autoPlay
        playsInline
        loop
        muted
        onPlay={(draft) => {
          draft.currentTarget.playbackRate = 1.5;
        }}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          top: 0,
          left: 0,
          position: "absolute",
          overflow: "hidden",
          display: active ? "block" : "none",
        }}
      >
        <source src={video} type="video/mp4" className="jsx-3758113214" />
      </video>
    );
  return (
    <iframe
      title="Test"
      src={`${video}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
      frameBorder="0"
      allowFullScreen
      style={{
        width: "100%",
        backgroundColor: "transparent",
        top: 0,
        left: 0,
        position: "absolute",
        overflow: "hidden",
        display: active ? "block" : "none",
      }}
    />
  );
}

export function FeatureBlock({
  items,
  ...defaultItem
}: {
  items?: ({ name: string } & Partial<FeatureItem>)[];
} & Partial<FeatureItem>) {
  const [currentIndex, setCurrentIndex] = useState<null | number>(
    items?.length ? 0 : null
  );
  const currentItem = (currentIndex !== null && items?.[currentIndex]) || null;
  const title = useMemo(
    () => currentItem?.title || defaultItem.title,
    [currentItem, defaultItem.title]
  );
  const description = useMemo(
    () => currentItem?.description || defaultItem.description,
    [currentItem, defaultItem.description]
  );
  const video = useMemo(
    () => currentItem?.video || defaultItem.video,
    [currentItem, defaultItem.video]
  );

  return (
    <Stack
      w="100%"
      direction={{ base: "column-reverse", md: "row" }}
      spacing={{ base: "20px", md: "100px" }}
    >
      <VStack
        alignItems="flex-start"
        justify="center"
        w={{ base: "100%", md: "40%" }}
      >
        <Box
          display={{ base: "none", md: defaultItem.icon ? "block" : "none" }}
          style={{ fontSize: 70 }}
        >
          {defaultItem.icon}
        </Box>

        <Heading
          as="h2"
          fontSize={{ base: "40px", md: "56px" }}
          lineHeight={{ base: "1.3", md: "56px" }}
          letterSpacing={{ base: undefined, md: "-0.5px" }}
          fontWeight="800"
        >
          {title}
        </Heading>
        <Text
          fontWeight="400"
          letterSpacing={{ base: undefined, md: "-0.2px" }}
          lineHeight={{ base: "1.3", md: "30px" }}
          fontSize={{ base: "24px", md: "24px" }}
        >
          {description}
        </Text>
        <VStack my="2" alignItems="flex-start" spacing="1">
          {items &&
            items.length > 1 &&
            items?.map((item, index) => (
              <Button
                size="xs"
                key={item.name}
                isActive={currentIndex === index}
                onClick={() => setCurrentIndex(index)}
              >
                {item.name}
              </Button>
            ))}
        </VStack>
      </VStack>
      <Box w={{ base: "100%", md: "60%" }}>
        <AspectRatio ratio={1.6}>
          <Box
            overflow="hidden"
            rounded="xl"
            boxShadow="0 2px 8px rgb(84 70 35 / 15%), 0 1px 3px rgb(84 70 35 / 15%)"
          >
            {!items?.length && video ? (
              <RenderVideoOrImage video={video} active />
            ) : null}
            {items?.map((item, index) =>
              index === currentIndex ? (
                <RenderVideoOrImage {...item} active={index === currentIndex} />
              ) : null
            )}
          </Box>
        </AspectRatio>
      </Box>
    </Stack>
  );
}
