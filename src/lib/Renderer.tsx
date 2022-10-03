import React, { ReactNode } from 'react';
import { Linking, ScrollView, View, Text } from 'react-native';
import MarkedList from '@jsamr/react-native-li';
import Disc from '@jsamr/counter-style/presets/disc';
import Decimal from '@jsamr/counter-style/presets/decimal';
import MDImage from './../components/MDImage';
import { generateRandomString } from '../utils/string';
import type { TextStyleProp, ViewStyleProp } from './types';

class Renderer {
  private onLinkPress = (href: string) => () => Linking.openURL(href);

  getTextNode = (children: string | ReactNode[], styles: TextStyleProp) => {
    return (
      <Text key={generateRandomString()} style={styles}>
        {children}
      </Text>
    );
  };

  getLinkNode = (text: string, href: string, styles: TextStyleProp) => {
    return (
      <Text
        key={generateRandomString()}
        onPress={this.onLinkPress(href)}
        style={styles}
      >
        {text}
      </Text>
    );
  };

  getViewNode(children: ReactNode[] | null, styles: ViewStyleProp) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getCodeBlockNode(
    text: string,
    containerStyle: ViewStyleProp,
    textStyle: TextStyleProp
  ) {
    return (
      <ScrollView contentContainerStyle={containerStyle} horizontal>
        <Text style={textStyle}>{text}</Text>
      </ScrollView>
    );
  }

  getBlockquoteNode(children: ReactNode[], styles: ViewStyleProp) {
    return (
      <View key={generateRandomString()} style={styles}>
        {children}
      </View>
    );
  }

  getImageNode(uri: string) {
    return <MDImage key={generateRandomString()} uri={uri} />;
  }

  getListNode(
    ordered: boolean,
    li: ReactNode[],
    listStyle: ViewStyleProp,
    textStyle: TextStyleProp
  ) {
    return (
      <MarkedList
        counterRenderer={ordered ? Decimal : Disc}
        markerTextStyle={textStyle}
        markerBoxStyle={listStyle}
      >
        {li.map((node) => node)}
      </MarkedList>
    );
  }
}

export default Renderer;
