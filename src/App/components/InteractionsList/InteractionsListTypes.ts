import React from "react";

export type ModalsState = {
  isShowCommentModal: boolean;
  setIsShowCommentModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCallInModal: boolean;
  setIsShowCallInModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCallOutModal: boolean;
  setIsShowCallOutModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowSmsInModal: boolean;
  setIsShowSmsInModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowSmsOutModal: boolean;
  setIsShowSmsOutModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEmailInModal: boolean;
  setIsShowEmailInModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEmailOutModal: boolean;
  setIsShowEmailOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}