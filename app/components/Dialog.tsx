import React from "react";
import { View } from "react-native";
import { Dialog } from "react-native-simple-dialogs";
interface DialogProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogComponent: React.FC<DialogProps> = ({
  visible,
  children,
  onClose,
}) => {
  return (
    <Dialog
      visible={visible}
      onTouchOutside={onClose}
      onRequestClose={onClose}
      contentInsetAdjustmentBehavior="automatic"
      dialogStyle={{
        padding: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>{children}</View>
    </Dialog>
  );
};

export default DialogComponent;
