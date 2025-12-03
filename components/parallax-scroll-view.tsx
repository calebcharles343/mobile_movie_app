import type { PropsWithChildren, ReactElement } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: string;
}>;

export default function SimpleScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  return (
    <ScrollView style={styles.container}>
      <ThemedView
        style={[styles.header, { backgroundColor: headerBackgroundColor }]}
      >
        {headerImage}
      </ThemedView>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
