// Publisher Subscriber pattern basic implementation using Revealing Module Pattern
function PubSub() {
  const events = new Map();

  const hasEvent = (eventType) => events.has(eventType);

  const subscribe = (eventType, subscriber) => {
    if (!hasEvent(eventType)) {
      events.set(eventType, new Set());
    }

    events.get(eventType).add(subscriber);
  };

  const unsubscribe = (eventType, subscriber) => {
    if (hasEvent(eventType)) {
      events.get(eventType).delete(subscriber);
    }
  };

  const notifySubscribers = (eventType, data) => {
    if (hasEvent(eventType)) {
      events.get(eventType).forEach((subscriber) => subscriber(data));
    }
  };

  return { subscribe, unsubscribe, notifySubscribers };
}

export default PubSub;
