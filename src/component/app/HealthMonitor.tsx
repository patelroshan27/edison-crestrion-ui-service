import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/react';
import classNames from 'classnames';
import axios from 'axios';

interface HealthMonitorProps {
  checkUrl?: string;
  checkInterval?: number;
}

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

export const HealthMonitor: React.FC<HealthMonitorProps> = ({
  checkInterval = 60_000,
  checkUrl = `${baseUrl}/health`,
}): JSX.Element => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [failureCount, setFailureCount] = useState(0);
  const requestsPerInterval = 4;

  const makeRequest = async (): Promise<void> => {
    try {
      await axios.get(checkUrl);
      setFailureCount(0); // Reset on success
      if (isOpen) onClose();
    } catch (err) {
      console.error(err);
      setFailureCount((prev) => prev + 1); // Increment on failure
    }
  };

  useEffect((): (() => void) => {
    const currentInterval = setInterval((): void => {
      void makeRequest();
    }, checkInterval / requestsPerInterval);

    return () => {
      if (currentInterval) clearInterval(currentInterval);
    };
  }, [checkUrl, checkInterval, isOpen, onOpen, onClose]);

  useEffect((): void => {
    if (failureCount >= requestsPerInterval && !isOpen) {
      onOpen();
    }
  }, [failureCount, isOpen, onOpen]);

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
