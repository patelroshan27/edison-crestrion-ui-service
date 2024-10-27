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
      className="bg-red-100 border border-red-800 rounded-xl text-center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="bg-red-500 text-white text-xl font-bold py-3 flex justify-center items-center">
              <AlertTriangle className="mr-2 text-2xl" /> Temporarily Offline
            </ModalHeader>
            <ModalBody className="py-6">
              <p className="text-gray-800">
                The service is currently unavailable due to maintenance.
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
