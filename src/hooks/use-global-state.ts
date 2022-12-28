import { atom, useAtom } from "jotai";

const globalStateAtom = atom({ muted: false, loaded: false });

export function useGlobalState() {
	return useAtom(globalStateAtom);
}
