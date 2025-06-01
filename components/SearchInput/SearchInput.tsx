// src/components/SearchInput.tsx

import { useDebounce } from "@/hooks/useDebounce";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { styles } from "./SearchInput.styles";

interface SearchInputProps extends Omit<TextInputProps, "onChangeText"> {
  /** Called whenever the debounced text changes (>= minLength). */
  onSearch: (debouncedText: string) => void;

  /** Called if user explicitly “submits” (presses “enter” or taps icon). */
  onSubmit?: (rawText: string) => void;

  /** Minimum characters before calling onSearch (default 2). */
  minLength?: number;

  /** Extra style overrides for the outer container. */
  containerStyle?: ViewStyle;

  /** Placeholder text. */
  placeholder?: string;
}

/**
 * A search bar that debounces user typing (via onSearch), and also
 * fires onSubmit when the user hits “enter” or taps the magnifying‐glass icon.
 */
const SearchInputBase: React.FC<SearchInputProps> = ({
  onSearch,
  onSubmit,
  minLength = 2,
  containerStyle,
  placeholder = "Search",
  style,
  ...textInputProps
}) => {
  // 1) Keep raw user‐typed query
  const [query, setQuery] = useState<string>("");
  // 2) Debounce it by 500ms
  const debouncedQuery = useDebounce<string>(query, 500);

  // 3) Whenever debouncedQuery changes, call onSearch if length >= minLength; else call onSearch('')
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length >= minLength) {
      onSearch(trimmed);
    } else {
      onSearch("");
    }
  }, [debouncedQuery, minLength, onSearch]);

  // 4) On every keystroke, update raw query immediately
  const handleChangeText = useCallback((text: string) => {
    setQuery(text);
  }, []);

  // 5) When the user taps the icon, we treat it like an explicit submit
  const handleIconPress = () => {
    const trimmed = query.trim();
    if (trimmed.length >= minLength) {
      onSearch(trimmed);
      onSubmit?.(trimmed);
    } else {
      onSearch("");
      onSubmit?.("");
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...textInputProps}
        value={query}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={[styles.textInput, style]}
        returnKeyType="search"
        onSubmitEditing={() => {
          // Called when user taps “search” on the keyboard
          const trimmed = query.trim();
          if (trimmed.length >= minLength) {
            onSearch(trimmed);
            onSubmit?.(trimmed);
          } else {
            onSearch("");
            onSubmit?.("");
          }
        }}
      />
      <TouchableOpacity onPress={handleIconPress}>
        <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export const SearchInput = React.memo(SearchInputBase);
SearchInput.displayName = "SearchInput";
