import {
  ComponentPropsWithoutRef,
  JSXElementConstructor,
  PropsWithChildren,
} from 'react';

export type ReactTag = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type PropsOf<TTag extends ReactTag> = ComponentPropsWithoutRef<TTag>;

type DefaultProps<TTag extends ReactTag> = {
  as?: TTag;
  children?: PropsWithChildren['children'];
  className?: string;
};

type CleanProps<TTag extends ReactTag, TOmitable extends PropertyKey> = Omit<
  PropsOf<TTag>,
  TOmitable | keyof DefaultProps<TTag>
>;

export type Props<
  TTag extends ReactTag,
  TOmitable extends PropertyKey = never,
> = CleanProps<TTag, TOmitable> & DefaultProps<TTag>;
