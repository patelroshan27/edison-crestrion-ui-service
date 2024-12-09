import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
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
      hideCloseButton
      placement="center"
      className={classNames(
        'outline-none focus:outline-none',
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        'text-lg border-1 border-red-700 bg-red-100',
        'rounded-xl font-medium text-center',
        'max-w-md w-full',
        'h-auto',
      )}>
      <ModalContent
        className={classNames(
          'flex flex-col items-center justify-center',
          'w-full',
          'min-h-0',
        )}>
        {() => (
          <>
            <ModalHeader
              className={classNames(
                'outline-none focus:outline-none',
                'w-full flex items-center justify-center',
                'text-lg bg-red-400',
                'rounded-t font-large text-center',
                'py-3',
              )}>
              Temporarily Offline
            </ModalHeader>
            <ModalBody className="text-center py-4">
              <p>The service is currently unavailable due to maintenance.</p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
