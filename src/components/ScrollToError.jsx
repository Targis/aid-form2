import { useFormikContext } from 'formik';
import { useEffect } from 'react';

function ScrollToError() {
  const formik = useFormikContext();
  const submitting = formik?.isSubmitting;

  useEffect(() => {
    const el = document.querySelector('.Mui-error, [data-error]');
    (el?.parentElement ?? el)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [submitting]);
  return null;
}

export default ScrollToError