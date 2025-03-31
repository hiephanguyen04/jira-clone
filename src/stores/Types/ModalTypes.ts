export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export interface ModalState {
  visible: boolean;
  title: React.ReactNode;
  Component: React.ReactNode;
}
