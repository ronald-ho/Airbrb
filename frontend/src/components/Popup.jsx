import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

function Popup (props) {
  const {
    title,
    body,
    primaryButtonText,
    onClose,
    onConfirm
  } = props;

  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader id='alert-dialog-title'>
            {title}
          </AlertDialogHeader>
          <AlertDialogBody id='alert-dialog-description'>
            {body}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue' onClick={onConfirm} ml={3}>
              {primaryButtonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Popup;
