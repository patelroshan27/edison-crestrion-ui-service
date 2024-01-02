import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const BMS_API = `http://10.21.162.252:5000/bms/roomTemperature`;
const CRESTRON_API = `http://10.21.162.252:5000/crestron/roomTemperature`;

function getFarenheit(tempInCelcius: number): number {
  return tempInCelcius * (9 / 5) + 32;
}

function getCelcius(tempInFarenheit: number): number {
  return (tempInFarenheit - 32) * (5 / 9);
}

interface Response {
  celcius: string | null;
  farenheit: string | null;
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
}

export default function useTemperatureForRoomID(
  roomID: string | number | undefined | null,
  bmsAPI: boolean = false,
  sigfig: number = 1,
): Response {
  const [tempInC, setTempInC] = useState<number | null>(null);

  const handleDataUpdate = useCallback(async () => {
    if (roomID == null) {
      return;
    }

    try {
      const tempData = await axios.get(
        `${bmsAPI ? BMS_API : CRESTRON_API}/${roomID}`,
      );
      if (tempData.status === axios.HttpStatusCode.Ok) {
        const newTempInF = Number(tempData.data);
        if (!Number.isNaN(newTempInF)) {
          setTempInC(getCelcius(newTempInF));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      handleDataUpdate().catch((error) => {
        console.error(error);
      });
    }, 1000 * 60);
    handleDataUpdate().catch((error) => {
      console.error(error);
    });
    return () => {
      clearInterval(intervalID);
    };
  }, [handleDataUpdate]);

  const handleSetTempInC = async (newTemperature: number): Promise<void> => {
    if (roomID == null) {
      return;
    }

    setTempInC(newTemperature);
    await axios.post(
      `http://10.21.162.252:5000/crestron/roomTemperature/${roomID}/${getFarenheit(
        newTemperature,
      )}`,
    );
  };

  const handleIncreaseTempInC = async (): Promise<void> => {
    if (tempInC == null) {
      return;
    }
    await handleSetTempInC(Math.floor(tempInC + 1));
  };

  const handleDecreaseTempInC = async (): Promise<void> => {
    if (tempInC == null) {
      return;
    }
    await handleSetTempInC(Math.floor(tempInC - 1));
  };

  return {
    farenheit: tempInC != null ? getFarenheit(tempInC).toFixed(sigfig) : null,
    celcius: tempInC != null ? tempInC.toFixed(sigfig) : null,
    increase: handleIncreaseTempInC,
    decrease: handleDecreaseTempInC,
  };
}
