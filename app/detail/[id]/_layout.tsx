import { Stack } from "expo-router";
import { FC } from "react";

const Layout: FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default Layout;
