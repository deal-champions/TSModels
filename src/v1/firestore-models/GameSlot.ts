import { DBRef } from './helpers';

export interface GameSlot {
  /** The registered users for this gameslot. */
  registeredParticipants: any[];

  /** The description of this GameSlot */
  description: string | null;
  requiredParticipants: number;
  name: string;

  /** The ids of the possibel basePlayerViewpoints */
  basePlayerViewpointRefs: DBRef[];
}
