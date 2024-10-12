import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import axios from 'axios';

interface HealthMonitorProps {
  checkUrl?: string;
  checkInterval?: number;
}

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const HealthMonitor: React.FC<HealthMonitorProps> = ({
  checkInterval = 60_000,
  checkUrl = `${baseUrl}/health`,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(checkUrl)
        .then(() => {
          if (isOpen) onClose();
        })
        .catch((err) => {
          console.log(err);
          if (!isOpen) onOpen();
        });
    }, checkInterval);

    return () => {
      clearInterval(interval);
    };
  }, [isOpen, onClose, onOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Service Unavailable</ModalHeader>
            <ModalBody>
              <p>
                We are sorry, but our service is currently unavailable due to
                technical issues. Please check back shortly.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
