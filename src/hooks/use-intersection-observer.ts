import { useEffect, useRef, useState } from "react";

export function useIntersectionObserver(options: IntersectionObserverInit) {
	const [visible, setVisible] = useState(false);
	const ref = useRef<Element | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setVisible(entry.isIntersecting);
		}, options);

		if (ref.current) observer.observe(ref.current);
		return () => observer.disconnect();
	}, [options, ref]);

	return [ref, visible];
}
