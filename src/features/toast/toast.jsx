import React from 'react';
import { Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export const toast$ = new Subject();

const useNotification = notificationStream$ => {
  const [_message, setMessage] = React.useState('');
  const [_type, setType] = React.useState('');
  React.useEffect(() => {
    const messages = notificationStream$
      .pipe(
        tap(({ type, message }) => {
          setMessage(message);
          setType(type);
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
  return [_message, clear, _type];
};

const Banner = () => {
  const [message, clear, type] = useNotification(toast$);

  // type === 'SUCCESS' && type === 'ERROR'

  return (
    <>
      {message && (
        <section
          className={`call_to_action_13  pt-100 pb-100 color-white text-center text-lg-left ${
            type === 'ERROR' ? 'bg-light-red' : 'bg-dark'
          }`}
        >
          <div className="container px-xl-0">
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-5 col-lg-6 col-md-8 col-sm-10"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="0"
              >
                <h6 className="f-22 regular text-adaptive white">{message}</h6>
              </div>
              <div
                className="col-xl-5 col-lg-6 text-lg-right buttons"
                data-aos-duration="600"
                data-aos="fade-down"
                data-aos-delay="300"
              >
                <button
                  type="button"
                  onClick={() => clear()}
                  className="mt-30 mt-lg-0 btn lg border-transparent-white mr-30"
                >
                  Close
                </button>
                {/* <button
                  type="button"
                  onClick={() => clear()}
                  className="mt-30 mt-lg-0  btn lg action-3"
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Banner;

// <div className="w-100 ma3">
//   {/* {message && ( */}
//   <div
//     role="button"
//     tabIndex={-1}
//     onKeyDown={() => clear()}
//     className={`${(type === 'SUCCESS' && 'bg-washed-green dark-green') ||
//       (type === 'ERROR' && 'bg-washed-red red') ||
//       'bg-lightest-blue navy'} flex items-center justify-center pa4 br-pill w-100  pointer`}
//     data-tesid="notification"
//     onClick={() => clear()}
//   >
//     <span
//       role="button"
//       tabIndex={-1}
//       onKeyDown={() => clear()}
//       className="lh-title ml3 tc"
//       onClick={() => clear()}
//     >
//       {/* {message} */}
//       hello
//     </span>
//     <FormClose
//       className="dim ma3 pointer"
//       color="navy"
//       onClick={() => clear()}
//       data-testid="closeNotification"
//     />
//   </div>
//   {/* )} */}
// </div>;
