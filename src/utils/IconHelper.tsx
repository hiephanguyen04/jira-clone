import {
  CarOutlined,
  CheckSquareTwoTone,
  CodeSandboxOutlined,
  CreditCardOutlined,
  ExclamationCircleOutlined,
  FileOutlined,
  HomeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  PicCenterOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Wrapper components to fix TypeScript strict typing issues with icons
export const StyledExclamationCircleOutlined: React.FC<IconProps> = (props) => (
  <ExclamationCircleOutlined {...(props as any)} />
);

export const StyledLoadingOutlined: React.FC<IconProps> = (props) => (
  <LoadingOutlined {...(props as any)} />
);

export const StyledSearchOutlined: React.FC<IconProps> = (props) => (
  <SearchOutlined {...(props as any)} />
);

export const StyledHomeOutlined: React.FC<IconProps> = (props) => (
  <HomeOutlined {...(props as any)} />
);

export const StyledCheckSquareTwoTone: React.FC<IconProps> = (props) => (
  <CheckSquareTwoTone {...(props as any)} />
);

export const StyledPlusOutlined: React.FC<IconProps> = (props) => (
  <PlusOutlined {...(props as any)} />
);

export const StyledQuestionCircleOutlined: React.FC<IconProps> = (props) => (
  <QuestionCircleOutlined {...(props as any)} />
);

export const StyledLogoutOutlined: React.FC<IconProps> = (props) => (
  <LogoutOutlined {...(props as any)} />
);

export const StyledSettingOutlined: React.FC<IconProps> = (props) => (
  <SettingOutlined {...(props as any)} />
);

export const StyledUserOutlined: React.FC<IconProps> = (props) => (
  <UserOutlined {...(props as any)} />
);

export const StyledCarOutlined: React.FC<IconProps> = (props) => (
  <CarOutlined {...(props as any)} />
);

export const StyledCodeSandboxOutlined: React.FC<IconProps> = (props) => (
  <CodeSandboxOutlined {...(props as any)} />
);

export const StyledCreditCardOutlined: React.FC<IconProps> = (props) => (
  <CreditCardOutlined {...(props as any)} />
);

export const StyledFileOutlined: React.FC<IconProps> = (props) => (
  <FileOutlined {...(props as any)} />
);

export const StyledPicCenterOutlined: React.FC<IconProps> = (props) => (
  <PicCenterOutlined {...(props as any)} />
);

export const StyledPlusCircleOutlined: React.FC<IconProps> = (props) => (
  <PlusCircleOutlined {...(props as any)} />
);

export const StyledRiseOutlined: React.FC<IconProps> = (props) => (
  <RiseOutlined {...(props as any)} />
);
