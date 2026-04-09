import { useState, useEffect, useRef, useCallback } from 'react';
import { TICKER_CONTENT, TICKER_CATEGORIES, getCategoryLabel } from '../config/tickerContent';

const MESSAGE_DURATION = 8000; // 8 seconds per message

export const useTickerRotation = (adminMessage, adminTimestamp) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');

  // Track position in rotation
  const categoryIndexRef = useRef(0);
  const messageIndexRef = useRef(0);
  const pendingAdminMessageRef = useRef(null);
  const lastAdminTimestampRef = useRef(0);

  // Check for new admin message
  useEffect(() => {
    if (adminMessage && adminTimestamp > lastAdminTimestampRef.current) {
      pendingAdminMessageRef.current = adminMessage;
      lastAdminTimestampRef.current = adminTimestamp;
    }
  }, [adminMessage, adminTimestamp]);

  const getNextMessage = useCallback(() => {
    const categories = TICKER_CATEGORIES;
    const currentCatKey = categories[categoryIndexRef.current];
    const messages = TICKER_CONTENT[currentCatKey];

    // Check if we're at the end of current category
    const isEndOfCategory = messageIndexRef.current >= messages.length - 1;

    // If there's a pending admin message and we're at end of category, show it
    if (isEndOfCategory && pendingAdminMessageRef.current) {
      const adminMsg = pendingAdminMessageRef.current;
      pendingAdminMessageRef.current = null;

      // Move to next category for after admin message
      categoryIndexRef.current = (categoryIndexRef.current + 1) % categories.length;
      messageIndexRef.current = 0;

      return { message: adminMsg, category: 'BROADCAST' };
    }

    // Get current message
    const message = messages[messageIndexRef.current];
    const category = getCategoryLabel(currentCatKey);

    // Advance to next message
    messageIndexRef.current++;

    // If we've exhausted this category, move to next
    if (messageIndexRef.current >= messages.length) {
      messageIndexRef.current = 0;
      categoryIndexRef.current = (categoryIndexRef.current + 1) % categories.length;
    }

    return { message, category };
  }, []);

  // Rotation timer
  useEffect(() => {
    // Show first message immediately
    const first = getNextMessage();
    setCurrentMessage(first.message);
    setCurrentCategory(first.category);

    const interval = setInterval(() => {
      const next = getNextMessage();
      setCurrentMessage(next.message);
      setCurrentCategory(next.category);
    }, MESSAGE_DURATION);

    return () => clearInterval(interval);
  }, [getNextMessage]);

  return {
    currentMessage,
    currentCategory,
  };
};
