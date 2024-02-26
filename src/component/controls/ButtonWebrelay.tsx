import React, { useEffect, useRef, useState } from 'react';
import { type CrestronWebrelayConfig } from 'utils/Configs';
import { useRecoilState } from 'recoil';
import { webRelayPendingActionState } from 'state/navigation';
import { useWebRelayApiState } from 'utils/hooks';
import { type ButtonCommonProps, SimpleButton } from './SimpleButton';

interface ButtonRelayProps extends ButtonCommonProps {
  webRelayConfig: CrestronWebrelayConfig;
}

export const ButtonWebrelay: React.FC<ButtonRelayProps> = ({
  webRelayConfig,
  ...props
}) => {
  const pendingActionRef = useRef('');
  const [active, setActive] = useState(false);
  const [pendingAction, setPendingAction] = useRecoilState(
    webRelayPendingActionState,
  );
  const sendWebRelay = useWebRelayApiState();
  const actionKey = props.title ?? props.label;

  useEffect(() => {
    pendingActionRef.current = pendingAction;
    if (!pendingAction && active) {
      if (webRelayConfig.payload.action === 'STOP') {
        setTimeout(() => setActive(false), 2000);
      } else {
        setActive(false);
      }
    }
  }, [pendingAction]);

  const shouldUpdate = (): boolean =>
    !pendingActionRef.current || pendingActionRef.current === actionKey;

  return (
    <SimpleButton
      disabled={
        active ||
        (Boolean(pendingAction) && webRelayConfig.payload.action !== 'STOP')
      }
      isOn={active}
      onClick={() => {
        shouldUpdate() && setPendingAction(actionKey);
        setActive(true);
        sendWebRelay(webRelayConfig.payload)
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            shouldUpdate() && setPendingAction('');
          });
      }}
      {...props}
    />
  );
};
