import React, { useEffect, useState, useCallback } from 'react';
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
  checkInterval?: number; // Interval in milliseconds
}

const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

// Define a custom hook for health checking
const useHealthCheck = (
  checkUrl: string,
  requestsPerInterval: number,
  interval: number,
): number => {
  const [failureCount, setFailureCount] = useState<number>(0);

  // Explicitly set the return type for makeRequest
  const makeRequest = useCallback(async (): Promise<void> => {
    try {
      await axios.get(checkUrl);
      setFailureCount(0); // Reset on success
    } catch (err) {
      console.error('Health check failed:', err);
      setFailureCount((prev) => prev + 1); // Increment on failure
    }
  }, [checkUrl]);

  useEffect(() => {
    const currentInterval = setInterval(() => {
      void makeRequest(); // Fire request without awaiting
    }, interval / requestsPerInterval);

    return () => {
      clearInterval(currentInterval); // Cleanup interval on unmount
    };
  }, [makeRequest, interval, requestsPerInterval]);

  return failureCount; // Explicit return type
};

export const HealthMonitor: React.FC<HealthMonitorProps> = ({
  checkInterval = 60_000,
  checkUrl = `${baseUrl}/health`,
}) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const requestsPerInterval = 4;
  const failureCount = useHealthCheck(
    checkUrl,
    requestsPerInterval,
    checkInterval,
  );

  useEffect(() => {
    if (failureCount >= requestsPerInterval && !isOpen) {
      onOpen(); // Open modal if failures exceed threshold
    } else if (failureCount < requestsPerInterval && isOpen) {
      onClose(); // Close modal if errors are resolved
    }
  }, [failureCount, isOpen, onOpen, onClose]);

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
