import type {
  TSignalStandardTypeName,
  TSignalValue,
} from '@crestron/ch5-crcomlib';

import * as CrComLib from '@crestron/ch5-crcomlib';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { getConfigs, type CrestronWebrelayPayload } from './Configs';

const { webRelayURL } = getConfigs();

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

function useApiState<T>(
  url: string,
): (data: CrestronWebrelayPayload) => Promise<T> {
  return useCallback(async (data: CrestronWebrelayPayload) => {
    return await axios.post(url, data).then((res) => res.data as T);
  }, []);
}

export function useWebRelayApiState(): (
  data: CrestronWebrelayPayload,
) => Promise<unknown> {
  return useApiState<unknown>(webRelayURL as string);
}
