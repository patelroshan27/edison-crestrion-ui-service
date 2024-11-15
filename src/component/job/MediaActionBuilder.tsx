import React, { type FormEvent, useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {
  type JobActionItem,
  MEDIA_PLAYER_ACTION_TYPES,
  MEDIA_PLAYERS,
} from './jobUtils';
import { DEFAULT_SELECT_PROPS } from './formUtils';
import { type MediaPlayerCmd } from 'component/media/hooks';
import { MediaSelection } from './MediaSelection';
import { type SelectedMediaIds } from 'component/media/MediaPlayer';
import uniq from 'lodash/uniq';
import { type ApiCommand } from 'config/Configs';

interface MediaActionBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  handleActionChange: (newAction: JobActionItem) => void;
}

const MediaActionBuilder: React.FC<MediaActionBuilderProps> = ({
  isOpen,
  onClose,
  handleActionChange,
}) => {
  const [playerId, setPlayerId] = useState<string>();
  const [typeIds, setTypeIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<SelectedMediaIds>();

  const resetAndClose = () => {
    setPlayerId(undefined);
    setTypeIds([]);
    setSelectedIds(undefined);
    onClose();
  };

  const onAddToQueue = (ids: SelectedMediaIds) => {
    setSelectedIds((prev) => {
      return {
        playlistIds: uniq(
          (prev?.playlistIds ?? []).concat(ids.playlistIds ?? []),
        ),
        albumIds: uniq((prev?.albumIds ?? []).concat(ids.albumIds ?? [])),
        trackIds: uniq((prev?.trackIds ?? []).concat(ids.trackIds ?? [])),
      };
    });
  };

  const removeFromQueue = (
    type: keyof SelectedMediaIds,
    idToRemove: string,
  ) => {
    setSelectedIds((prev) => {
      return {
        ...prev,
        [type]: prev?.[type]?.filter((id) => id !== idToRemove),
      };
    });
  };

  const onActionAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const actionMatches = MEDIA_PLAYER_ACTION_TYPES.filter((x) =>
      typeIds.includes(x.id),
    );
    const playerMatch = MEDIA_PLAYERS.find((x) => x.playerId === playerId);

    if (!actionMatches.length || !playerMatch) return;

    actionMatches
      .map<JobActionItem>((action) => {
        const command = {
          type: 'media' as const,
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
          payload: {
            cmdType: action.type,
            payload: {
              ...action.options,
              ...(action.type === 'addToPlayer' ? selectedIds : {}),
              playerId: playerMatch.playerId,
            },
          } as MediaPlayerCmd,
        };

        // if we are adding to queue, we also need to clear & play
        const commands: ApiCommand[] =
          action.type === 'addToPlayer'
            ? [
                {
                  type: 'media',
                  payload: {
                    cmdType: 'clearPlayer',
                    payload: { playerId: playerMatch.playerId },
                  },
                },
                command,
                {
                  type: 'media',
                  payload: {
                    cmdType: 'play',
                    payload: { playerId: playerMatch.playerId },
                  },
                },
              ]
            : [command];

        return {
          id: '',
          label: action.label,
          authID: playerMatch.authID as string,
          target: 'MediaPlayer',
          commands,
        };
      })
      .forEach(handleActionChange);

    resetAndClose();
  };

  const showMediaSelection = typeIds.includes('addToPlayerON');

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} size="full">
      <ModalContent>
        <form onSubmit={onActionAdd} id="media-action-builder">
          <ModalHeader>
            <h2>Media Action Builder</h2>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col grow gap-2">
              <div className="flex gap-2">
                <Select
                  {...DEFAULT_SELECT_PROPS}
                  label="Player"
                  placeholder="Select Player"
                  isRequired
                  selectedKeys={playerId && [playerId]}
                  onSelectionChange={(value) =>
                    setPlayerId(Array.from(value as Set<string>)[0])
                  }>
                  {MEDIA_PLAYERS.map((player) => (
                    <SelectItem key={player.playerId}>
                      {player.authID}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  {...DEFAULT_SELECT_PROPS}
                  label="Type"
                  placeholder="Select Action Type"
                  isRequired
                  selectionMode="multiple"
                  selectedKeys={typeIds}
                  onSelectionChange={(value) =>
                    setTypeIds(Array.from(value as Set<string>))
                  }>
                  {MEDIA_PLAYER_ACTION_TYPES.map((type) => (
                    <SelectItem key={type.id}>{type.label}</SelectItem>
                  ))}
                </Select>
              </div>

              {showMediaSelection && (
                <MediaSelection
                  onAddToQueue={onAddToQueue}
                  removeFromQueue={removeFromQueue}
                  queuedIds={selectedIds}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" form="media-action-builder">
              Add
            </Button>
            <Button color="danger" variant="light" onPress={resetAndClose}>
              Close
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default MediaActionBuilder;
