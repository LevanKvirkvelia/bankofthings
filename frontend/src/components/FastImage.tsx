import { Image, ImageProps } from '@chakra-ui/react';

type CDNImageOptions = {
	w?: number;
	h?: number;
	size?: number;
	fit?: 'scale-down' | 'contain' | 'cover' | 'crop' | 'pad';
	g?: 'auto' | 'left' | 'right' | 'top' | 'bottom' | string;
	q?: number;
	f?: 'auto' | 'png' | 'webp' | 'jpeg';
	dpr?: number;
};

export function FastImage(props: Omit<ImageProps, 'w' | 'h' | 'width' | 'height'> & { cdn: CDNImageOptions }) {
	const optionsWithDefaults: CDNImageOptions = {
		f: 'auto',
		...props.cdn,
		size: (props.cdn.size || 0) * window.devicePixelRatio || undefined,
		w: (props.cdn.w || 0) * window.devicePixelRatio || undefined,
		h: (props.cdn.h || 0) * window.devicePixelRatio || undefined,
	};

	const optionString = Object.keys(optionsWithDefaults)
		.filter((k) => typeof optionsWithDefaults[k as keyof CDNImageOptions] !== 'undefined')
		.map((k) => `${k}=${optionsWithDefaults[k as keyof CDNImageOptions]}`)
		.join(',');

	const src = `https://app.bankofthings.com/cdn-cgi/image/${optionString}/${props.src}`;

	return (
		<Image
			{...props}
			w={optionsWithDefaults.w ? `${optionsWithDefaults.w / window.devicePixelRatio}px` : undefined}
			h={optionsWithDefaults.h ? `${optionsWithDefaults.h / window.devicePixelRatio}px` : undefined}
			src={src}
		/>
	);
}
