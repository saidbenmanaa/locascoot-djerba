import type { Vehicle } from '@/types/content';

import zimotaTapo50 from './zimota-tapo-50';
import cappuccinoS125 from './cappuccino-s-125';

/**
 * The full fleet.
 *
 * ➕ To add a vehicle: copy an existing file in this folder, edit the values,
 *    then import it above and add it to the list below.
 * ➖ To hide a vehicle: set `available: false` in its own file. Keep it here —
 *    that way you can bring it back in one edit when it returns to service.
 */
export const vehicles: Vehicle[] = [zimotaTapo50, cappuccinoS125];

export default vehicles;
