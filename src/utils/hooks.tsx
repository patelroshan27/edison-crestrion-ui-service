import type {
  TSignalStandardTypeName,
  TSignalValue,
} from '@crestron/ch5-crcomlib';

import * as CrComLib from '@crestron/ch5-crcomlib';
import axios, { type AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  type CrestronWebrelayPayload,
  type LightsApiPayload,
  type ApiCommand,
  type AudioApiPaylod,
  type ProjectorsApiPayload,
} from '../config/Configs';
import { useRecoilValue } from 'recoil';
import { activeConfigState } from 'state/navigation';
import { type MediaPlayerCmd } from 'component/media/hooks';

// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         resolve({ data: '13107' });
//       }, 100);
//     });
//   },
// );

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string;

// Generic hook to handle common logic of send and receive
function useSignalState<T extends TSignalValue>(
  type: TSignalStandardTypeName,
  signalName: string,
  defaultValue: T,
): T {
  const [feedback, setFeedback] = useState(defaultValue);

  useEffect(() => {
    const subscriptionID = CrComLib.subscribeState(
      type,
      signalName,
      (value: any) => {
        const typedValue: T = value;
        setFeedback(typedValue);
      },
    );
    return () => {
      CrComLib.unsubscribeState(type, signalName, subscriptionID);
    };
  }, [type, signalName]);

  return feedback;
}

export function useDigitalState(signalName: string): boolean {
  return useSignalState<boolean>('boolean', signalName, false);
}

function sendSignalCmd(signalName: string, delay = 500): void {
  CrComLib.publishEvent('boolean', signalName, true);
  setTimeout(() => {
    CrComLib.publishEvent('boolean', signalName, false);
  }, delay);
}

function useApiState<D, R>(path: string): (data: D) => Promise<R> {
  return useCallback(async (data: D) => {
    return await axios
      .post<R, AxiosResponse<R>, D>(`${apiBaseUrl}${path}`, data)
      .then((res) => res.data);
  }, []);
}

export function useWebRelayApiState(): (
  data: CrestronWebrelayPayload,
) => Promise<unknown> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<CrestronWebrelayPayload, unknown>(
    config.webRelayApiPath as string,
  );
}

export function usePharosApiState(): (
  data: LightsApiPayload[],
) => Promise<unknown> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<LightsApiPayload[], unknown>(
    config.pharosApiPath as string,
  );
}

export function useZumApiState(): (
  data: LightsApiPayload[],
) => Promise<unknown> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<LightsApiPayload[], unknown>(config.zumApiPath as string);
}

export function useAudioApiState(): (data: AudioApiPaylod) => Promise<unknown> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<AudioApiPaylod, unknown>(config.audioApiPath as string);
}

export function useMediaApiState<T>(): (data: MediaPlayerCmd) => Promise<T> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<MediaPlayerCmd, T>(config.mediaApiPath as string);
}

export function useProjectorApiState(): (
  data: ProjectorsApiPayload[],
) => Promise<unknown> {
  const config = useRecoilValue(activeConfigState);
  return useApiState<ProjectorsApiPayload[], unknown>(
    config.projectorApiPath as string,
  );
}

export function useApiCommands(): (
  commands: ApiCommand[],
) => Promise<unknown[]> {
  const sendPharosCmd = usePharosApiState();
  const sendZumCmd = useZumApiState();
  const sendWebRelayCmd = useWebRelayApiState();
  const sendAudioCmd = useAudioApiState();
  const sendProjectorCmd = useProjectorApiState();

  return useCallback((commands: ApiCommand[]) => {
    const promises = commands
      .map((command) => {
        if (command.type === 'pharos') return sendPharosCmd(command.payloads);
        if (command.type === 'zum') return sendZumCmd(command.payloads);
        if (command.type === 'audio') return sendAudioCmd(command.payload);
        if (command.type === 'projector')
          return sendProjectorCmd(command.payloads);
        if (command.type === 'webrelay')
          return sendWebRelayCmd(command.payload);
        if (command.type === 'signal')
          return sendSignalCmd(command.payload.signalName);

        return undefined;
      })
      .filter((x) => Boolean(x));

    return Promise.all(promises);
  }, []);
}
