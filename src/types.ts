export type Message = {
	id: number;
	text: string;
	from: "user" | "ai";
};
