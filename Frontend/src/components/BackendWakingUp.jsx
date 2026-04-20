import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const PET_TIPS = [
  'Vì deployment bản free nên mất khoảng 30s để các service được khởi động hoàn toàn.',
  'Mẹo nhỏ: Nước sạch luôn sẵn sàng giúp chó và mèo khỏe hơn.'
];

const POLL_INTERVAL_MS = 3000;
const REQUEST_TIMEOUT_MS = 5000;
const MAX_WAIT_MS = 90000;
const EXIT_ANIMATION_MS = 700;

function BackendWakingUp({ onReady }) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const [retrySeed, setRetrySeed] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const healthUrl = useMemo(() => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    return baseUrl ? `${baseUrl}/api/health` : '/api/health';
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [retrySeed]);

  useEffect(() => {
    const tipTimerId = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % PET_TIPS.length);
    }, 5000);

    return () => clearInterval(tipTimerId);
  }, [retrySeed]);

  useEffect(() => {
    let finished = false;
    let pollId;
    let maxWaitId;

    const checkHealth = async () => {
      if (finished) {
        return;
      }

      const controller = new AbortController();
      const abortId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      try {
        const response = await fetch(healthUrl, {
          method: 'GET',
          signal: controller.signal,
          cache: 'no-store'
        });

        if (response.status === 200) {
          finished = true;
          clearInterval(pollId);
          clearTimeout(maxWaitId);
          setErrorMessage('');
          setIsVisible(false);

          setTimeout(() => {
            onReady?.();
          }, EXIT_ANIMATION_MS);
        }
      } catch {
        // Ignore temporary network failures while backend is cold-starting.
      } finally {
        clearTimeout(abortId);
      }
    };

    checkHealth();
    pollId = setInterval(checkHealth, POLL_INTERVAL_MS);

    maxWaitId = setTimeout(() => {
      if (finished) {
        return;
      }

      finished = true;
      clearInterval(pollId);
      setErrorMessage('Backend chưa sẵn sàng sau 90 giây. Vui lòng thử lại sau ít phút.');
    }, MAX_WAIT_MS);

    return () => {
      finished = true;
      clearInterval(pollId);
      clearTimeout(maxWaitId);
    };
  }, [healthUrl, onReady, retrySeed]);

  const progressPercent = Math.min((elapsedSeconds / (MAX_WAIT_MS / 1000)) * 100, 100);

  const handleRetry = () => {
    setElapsedSeconds(0);
    setTipIndex(0);
    setErrorMessage('');
    setIsVisible(true);
    setRetrySeed((prev) => prev + 1);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-white px-4"
          role="status"
          aria-live="polite"
        >
          <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white/90 p-6 shadow-[0_16px_50px_rgba(249,115,22,0.18)] backdrop-blur-sm sm:p-8">
            <div className="mx-auto mb-5 flex w-fit items-center justify-center rounded-full bg-orange-100 p-4">
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, -6, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl"
                aria-hidden="true"
              >
                🐾
              </motion.div>
            </div>

            <h1 className="text-center text-2xl font-bold text-orange-900">PetRanger</h1>
            <p className="mt-2 text-center text-base font-medium text-orange-700">
              Hệ thống đang khởi động, vui lòng chờ...
            </p>

            <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-orange-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500"
                initial={{ width: '0%' }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ ease: 'easeOut', duration: 0.5 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-orange-700">
              <span>Đang chờ... {elapsedSeconds}s</span>
              <span className="inline-flex gap-1" aria-hidden="true">
                <motion.span
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                >
                  •
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                >
                  •
                </motion.span>
                <motion.span
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                >
                  •
                </motion.span>
              </span>
            </div>

            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-orange-800"
            >
              {PET_TIPS[tipIndex]}
            </motion.p>

            {errorMessage && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <p>{errorMessage}</p>
                <button
                  type="button"
                  onClick={handleRetry}
                  className="mt-3 rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Thử lại
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BackendWakingUp;