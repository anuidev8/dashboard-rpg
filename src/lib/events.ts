import { ReadableStreamDefaultController } from 'stream/web';
import { ChallengeSubmission } from '@prisma/client';

type Connection = {
  controller: ReadableStreamDefaultController;
};

const connections: Map<string, Connection> = new Map();

export function addConnection(id: string, controller: ReadableStreamDefaultController) {
  connections.set(id, { controller });
}

export function removeConnection(id: string) {
  connections.delete(id);
}

export function emitSubmissionEvent(submission: ChallengeSubmission & {
  challenge: any;
  user: {
    name: string;
  };
}) {
  const eventData = `data: ${JSON.stringify(submission)}\n\n`;
  
  connections.forEach(({ controller }) => {
    try {
      controller.enqueue(eventData);
    } catch (error) {
      console.error('Error sending event:', error);
    }
  });
} 