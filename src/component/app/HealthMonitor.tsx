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
import classNames from 'classnames';

interface HealthMonitorProps {
  checkUrl?: string;
  checkInterval?: number;
}

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={classNames(
        'outline-none focus:outline-none',
        'h-auto w-full flex items-center justify-center',
        'text-lg border-2 border-red-700 bg-red-100',
        'rounded-xl font-medium text-center',
      )}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader
              className={classNames(
                'outline-none focus:outline-none',
                'h-auto w-full flex items-center justify-center',
                'text-lg border-2 border-red-700 bg-red-400',
                'rounded font-large text-center',
              )}>
              Temporarily Offline
            </ModalHeader>
            <ModalBody>
              <p>The service is currently unavailable due to maintenance.</p>
            </ModalBody>
            <ModalFooter>
              <Button
                className={classNames(
                  'outline-none focus:outline-none',
                  'h-auto w-full flex items-center justify-center',
                  'text-lg border-2 border-red-700 bg-red-500',
                  'rounded-xl font-large text-center',
                )}
                onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
