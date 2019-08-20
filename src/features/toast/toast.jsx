import { FormClose } from 'grommet-icons';
import React from 'react';
import { Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export const toast$ = new Subject();

const useNotification = notificationStream$ => {
  const [message, setMessage] = React.useState('');
  const [type, setType] = React.useState('');
  React.useEffect(() => {
    const messages = notificationStream$
      .pipe(
        tap(({ _type, _message }) => {
          setMessage(_message);
          setType(_type);
        }),
        delay(10000),
        tap(() => {
          setMessage('');
          setType('');
        })
      )
      .subscribe();

    return () => messages.unsubscribe();
  }, [notificationStream$]);
  const clear = () => setMessage('');
  return [message, clear, type];
};

const Banner = () => {
  const [message, clear, type] = useNotification(toast$);
  return (
    <div className="dn db-l absolute w-100 ma3">
      {message && (
        <div
          role="button"
          tabIndex={-1}
          onKeyDown={() => clear()}
          className={`${(type === 'SUCCESS' && 'bg-washed-green dark-green') ||
            (type === 'ERROR' && 'bg-washed-red red') ||
            'bg-lightest-blue navy'} flex items-center justify-center pa4 br-pill w-75 center z-1 pointer`}
          data-tesid="notification"
          onClick={() => clear()}
        >
          <span
            role="button"
            tabIndex={-1}
            onKeyDown={() => clear()}
            className="lh-title ml3 tc"
            onClick={() => clear()}
          >
            {message}
          </span>
          <FormClose
            className="dim ma3 pointer"
            color="navy"
            onClick={() => clear()}
            data-testid="closeNotification"
          />
        </div>
      )}
    </div>
  );
};

export default Banner;
