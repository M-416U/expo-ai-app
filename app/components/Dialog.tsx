import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Dialog as SimpleDialog } from "react-native-simple-dialogs";

interface DialogProps {
  visible: boolean;
  title?: string;
  message?: string;
  onClose: () => void;
  icon?: React.ReactNode;
}

const CustomDialog: React.FC<DialogProps> = ({
  visible,
  title,
  message,
  onClose,
  icon,
}) => {
  return (
    <SimpleDialog
      visible={visible}
      onTouchOutside={onClose}
      onRequestClose={onClose}
      contentInsetAdjustmentBehavior="automatic"
      dialogStyle={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        borderCurve: "continuous",
        borderRadius: 10,
      }}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Button title="Close" onPress={onClose} buttonStyle={styles.button} />
      </View>
    </SimpleDialog>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  message: {
    margin: 10,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#333",
    borderRadius: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
});

export default CustomDialog;
