import React, { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Button } from '@nextui-org/react';
import MediaActionBuilder from './MediaActionBuilder';
import { type JobActionItem } from './jobUtils';

interface MediaActionProps {
  handleActionChange: (newAction: JobActionItem) => void;
}

export const MediaAction: React.FC<MediaActionProps> = ({
  handleActionChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <Button
        aria-label="Open Media Action Builder"
        color="primary"
        variant="bordered"
        onClick={() => openModal()}>
        Add Media Player Action
        <PlayCircle />
      </Button>
      <MediaActionBuilder
        isOpen={modalVisible}
        onClose={closeModal}
        handleActionChange={handleActionChange}
      />
    </>
  );
};
