const whiteList = ["*"];

const corsOptions = {
	origin: (
		origin: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		callback: (err: Error | null, options?: any) => void
	) => {
		if (whiteList.indexOf(origin) !== -1 || !origin) callback(null, true);
		else callback(new Error("Not allowed by CORS"));
	},
};

export default corsOptions;
