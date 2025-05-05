import { useEffect, useRef } from 'react';
import { useSubmissionContext } from '@/contexts/SubmissionContext';

type NotificacionDto = {
  tipo: string;
  mensaje: string;
};

const initializedEmails = new Set<string>();
const recentMessages = new Map<string, number>();

export function useSSE(userEmail: string | null) {
  const eventSourceRef = useRef<EventSource | null>(null);
  const retryCountRef = useRef(0); // useRef to avoid re-renders
  const maxRetries = 5;
  const lastEventIdRef = useRef<string | null>(null);
  const { addNotification, setRefetchChallenges } = useSubmissionContext();
  const isInitializedRef = useRef(false);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>();
  const retryTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!userEmail) return;

    if (initializedEmails.has(userEmail)) {
      console.log(`🔄 Skipping duplicate SSE initialization for ${userEmail}`);
      return;
    }

    initializedEmails.add(userEmail);
    isInitializedRef.current = true;
    console.log(`🔌 Initializing SSE for ${userEmail}`);

    const stop = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      clearTimeout(retryTimeoutRef.current);
    };

    const connect = () => {
      let url = `${process.env.NEXT_PUBLIC_NOTIFICACIONES_URL}/eventos/subscribe/${userEmail}`;
      if (lastEventIdRef.current) {
        url += `?lastEventId=${encodeURIComponent(lastEventIdRef.current)}`;
      }

      const es = new EventSource(url);
      eventSourceRef.current = es;

      // Use addEventListener for better extensibility
      es.addEventListener('message', (event) => {
        lastEventIdRef.current = event.lastEventId || null;
        console.log('🌐 SSE raw event:', event);

        try {
          const data: NotificacionDto = JSON.parse(event.data);
          console.log('📨 Parsed SSE data:', data);

          if (isInitializedRef.current) {
            console.log('🔄 useSSE hook initialized', userEmail);
            isInitializedRef.current = false;
          }

          const messageKey = `${data.tipo}-${data.mensaje}`;
          const now = Date.now();

          if (recentMessages.has(messageKey) && now - recentMessages.get(messageKey)! < 5000) {
            console.log(`🔄 Skipping duplicate message: ${messageKey}`);
            return;
          }

          recentMessages.set(messageKey, now);
          const keysToDelete: string[] = [];
          recentMessages.forEach((timestamp, key) => {
            if (now - timestamp > 10000) keysToDelete.push(key);
          });
          keysToDelete.forEach(key => recentMessages.delete(key));

          if (data.tipo === 'FG') {
            console.log('🔄 Triggering challenge refetch due to FG notification');
            setRefetchChallenges(true);
          }

          addNotification({
            id: crypto.randomUUID(),
            type: data.tipo === 'PG' ? 'submission' :
                  data.tipo === 'FG' ? 'approved' :
                  data.tipo === 'HG' ? 'rejected' : 'submission',
            message: data.mensaje,
            timestamp: new Date().toISOString(),
            read: false,
            challengeId: 'default',
          });
        } catch (error) {
          console.error('❌ Failed to parse SSE event:', error);
        }
      });

      es.addEventListener('error', (err) => {
        console.error('❌ SSE error:', err);
        stop();

        if (retryCountRef.current < maxRetries) {
          const retryDelay = 3000 * 2 ** retryCountRef.current;
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current += 1;
            connect();
          }, retryDelay);
        } else {
          console.warn('⛔ Max retry attempts reached. Giving up.');
        }
      });
    };

    // ⏱️ Heartbeat monitor
    heartbeatIntervalRef.current = setInterval(() => {
      const es = eventSourceRef.current;
      if (es && es.readyState !== 1) {
        console.warn('🛑 SSE disconnected (readyState !== 1), reconnecting...');
        stop();
        connect();
      }
    }, 5000);

    connect();

    return () => {
      stop();
      clearInterval(heartbeatIntervalRef.current);
      if (isInitializedRef.current) {
        initializedEmails.delete(userEmail);
      }
    };
  }, [userEmail]);
}
