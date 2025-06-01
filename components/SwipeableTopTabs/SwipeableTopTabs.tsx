import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography";
import { styles } from "./SwipeableTopTabs.styles";

interface SwipeableTopTabsProps {
  options: string[];
  initialSelected?: string;
  onOptionSelect?: (option: string, index: number) => void;
}

export const SwipeableTopTabs: React.FC<SwipeableTopTabsProps> = ({
  options,
  initialSelected,
  onOptionSelect
}) => {
  const defaultIndex = initialSelected ? options.indexOf(initialSelected) : 0;
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [containerWidth, setContainerWidth] = useState(0);

  const animation = useRef(new Animated.Value(defaultIndex)).current;

  const toggleSelection = (index: number) => {
    setSelectedIndex(index);
    Animated.timing(animation, {
      toValue: index,
      duration: 300,
      useNativeDriver: false
    }).start();

    // Call the onOptionSelect callback with the selected option and index
    if (onOptionSelect) {
      onOptionSelect(options[index], index);
    }
  };

  const chipWidth = containerWidth / options.length;
  const translateX = animation.interpolate({
    inputRange: options.map((_, i) => i),
    outputRange: options.map((_, i) => i * chipWidth + 5)
  });

  return (
    <View
      testID="toggle-container"
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
      style={styles.toggleContainer}
    >
      <Animated.View
        testID="animated-chip"
        style={[
          styles.animatedChip,
          {
            width: chipWidth - 10,
            transform: [{ translateX }]
          }
        ]}
      />
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          testID={`option-${option}`}
          style={styles.option}
          onPress={() => toggleSelection(index)}
        >
          <Typography
            testID={`option-text-${option}`}
            style={
              selectedIndex === index ? { color: "black" } : { color: "white" }
            }
            variant={"bodySemiBold"}
          >
            {option}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};
