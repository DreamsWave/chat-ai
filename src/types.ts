export type Message = {
	id: string;
	text: string;
	from: "user" | "ai";
	isLoading: boolean;
};
