"use server";

import { getHeartrate as getHeartratePrimative } from "./pulsoid";

export const getHeartrate = () => getHeartratePrimative();
