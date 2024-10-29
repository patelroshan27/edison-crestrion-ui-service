import React, { useEffect, useState, useCallback } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/modal';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';

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

  return failureCount;
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
      className="bg-red-100 border border-red-800 rounded-xl text-center max-w-[90%] sm:max-w-[80%] md:max-w-[60%]"
      classNames={{
        base: 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]',
        backdrop: 'z-[99]',
      }}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="bg-red-500 text-white text-base sm:text-lg md:text-xl font-bold py-2 sm:py-3 flex justify-center items-center">
              <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />{' '}
              Temporarily Offline
            </ModalHeader>
            <ModalBody className="py-4 sm:py-5 md:py-6">
              <p className="text-gray-800 text-sm sm:text-base md:text-lg">
                The service is currently unavailable due to maintenance.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
