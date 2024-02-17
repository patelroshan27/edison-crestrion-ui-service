import type {
  TSignalStandardTypeName,
  TSignalValue,
} from '@crestron/ch5-crcomlib';

import * as CrComLib from '@crestron/ch5-crcomlib';
import axios, { type AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  getConfigs,
  type CrestronWebrelayPayload,
  type LightsApiPayload,
  type ApiCommand,
  type AudioApiPaylod,
} from './Configs';

const { webRelayApiPath, pharosApiPath, zumApiPath, audioApiPath } =
  getConfigs();
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string;

// Generic hook to handle common logic of send and receive
export function useMultipleSignalStates<T extends TSignalValue>(
  type: TSignalStandardTypeName,
  signalNames: string[],
): Record<string, T> {
  const [feedback, setFeedback] = useState<Record<string, T>>({});

  useEffect(() => {
    const subscriptionIDs: Record<string, string> = {};
    for (const signalName of signalNames) {
      const subscriptionID = CrComLib.subscribeState(
        type,
        signalName,
        (value: any) => {
          const typedValue: T = value;
          setFeedback((curr) => ({ ...curr, [signalName]: typedValue }));
        },
      );
      subscriptionIDs[signalName] = subscriptionID;
    }
    return () => {
      for (const [signalName, subscriptionID] of Object.entries(
        subscriptionIDs,
      )) {
        CrComLib.unsubscribeState(type, signalName, subscriptionID);
      }
    };
  }, [type, signalNames]);

  return feedback;
}

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

export function useAnalogState(signalName: string): number {
  return useSignalState<number>('number', signalName, 0);
}

export function useDigitalState(signalName: string): boolean {
  return useSignalState<boolean>('boolean', signalName, false);
}

export function useStringState(signalName: string): string {
  return useSignalState<string>('string', signalName, '');
}

export function usePublishAnalog(signalName: string): (value: number) => void {
  return useCallback(
    (value: number) => {
      CrComLib.publishEvent('number', signalName, value);
    },
    [signalName],
  );
}

export function usePublishDigital(
  signalName: string,
  delay: number = 200,
): () => void {
  return useCallback(() => {
    CrComLib.publishEvent('boolean', signalName, true);
    setTimeout(() => {
      CrComLib.publishEvent('boolean', signalName, false);
    }, delay);
  }, [delay, signalName]);
}

export function usePublishDigitalLatch(
  signalName: string,
): (value: boolean) => void {
  return useCallback(
    (value: boolean) => {
      CrComLib.publishEvent('boolean', signalName, value);
    },
    [signalName],
  );
}

export function usePublishString(signalName: string): (value: string) => void {
  return useCallback(
    (value: string) => {
      CrComLib.publishEvent('string', signalName, value);
    },
    [signalName],
  );
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
  return useApiState<CrestronWebrelayPayload, unknown>(
    webRelayApiPath as string,
  );
}

export function usePharosApiState(): (
  data: LightsApiPayload,
) => Promise<unknown> {
  return useApiState<LightsApiPayload, unknown>(pharosApiPath as string);
}

export function useZumApiState(): (data: LightsApiPayload) => Promise<unknown> {
  return useApiState<LightsApiPayload, unknown>(zumApiPath as string);
}

export function useAudioApiState(): (data: AudioApiPaylod) => Promise<unknown> {
  return useApiState<AudioApiPaylod, unknown>(audioApiPath as string);
}

export function useApiCommands(): (commands: ApiCommand[]) => Promise<unknown> {
  const sendPharosCmd = usePharosApiState();
  const sendZumCmd = useZumApiState();
  const sendWebRelayCmd = useWebRelayApiState();
  const sendAudioCmd = useAudioApiState();

  return useCallback((commands: ApiCommand[]) => {
    const promises = commands
      .map((command) => {
        if (command.type === 'pharos') return sendPharosCmd(command.payload);
        if (command.type === 'zum') return sendZumCmd(command.payload);
        if (command.type === 'audio') return sendAudioCmd(command.payload);
        if (command.type === 'webrelay')
          return sendWebRelayCmd(command.payload);

        return undefined;
      })
      .filter((x) => Boolean(x));

    return Promise.all(promises);
  }, []);
}
