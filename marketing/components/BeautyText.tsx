import styled from "@emotion/styled";
import React, { PropsWithChildren } from "react";

const RedBeautyStyles = styled.span`
  background: linear-gradient(135deg, #6699ff 0%, #ff3366 100%);
  color: #b664b0;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -ms-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
`;
const YellowBeautyStyles = styled.span`
  background: linear-gradient(135deg, #ffcc33 0%, #e233ff 100%);
  color: #f18099;
  background-clip: text !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
  -ms-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
`;

export function BeautyText({
  children,
  gradient = "yellow",
  ...rest
}: PropsWithChildren<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > & { gradient?: "yellow" | "red" }
>) {
  const child = <span {...rest}>{children}</span>;
  if (gradient === "red") return <RedBeautyStyles>{child}</RedBeautyStyles>;
  return <YellowBeautyStyles>{child}</YellowBeautyStyles>;
}
