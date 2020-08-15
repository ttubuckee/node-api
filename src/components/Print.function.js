import clc from "cli-color";

export const PrintType = {
	ETC: 0,
	MESSAGE: 1,
	SUCCESS: 2,
	WARNING: 3,
	ERROR: 4,
	EMPTY: 5
};

function getLabel(type) {
	switch(type) {
		case PrintType.ETC:		 return clc.xterm(199)(`[  ETC  ]`);
		case PrintType.MESSAGE:	 return clc.xterm( 51)(`[Message]`);
		case PrintType.SUCCESS:	 return clc.xterm( 40)(`[Success]`);
		case PrintType.WARNING:	 return clc.xterm(202)(`[Warning]`);
		case PrintType.ERROR:	 return clc.xterm( 10)(`[ Error ]`);
		case PrintType.EMPTY:
		default: 				 return 			   `         `;
	}
}
export default function Print(type, message) {
	console.log(`${getLabel(type)} ${message}`);
}

Print.type = {
	ETC: 0,
	MESSAGE: 1,
	SUCCESS: 2,
	WARNING: 3,
	ERROR: 4,
	EMPTY: 5
};

export function printLogo() {
	Print(5, "  _  ___   _ _  _  ___    ___                          _ _        ");
	Print(5, " | |/ / | | | \\| |/ __|  / __|___ _ __  _ __ _  _ _ _ (_) |_ _  _ ");
	Print(5, " | ' <| |_| | .` | (_ | | (__/ _ \\ '  \\| '  \\ || | ' \\| |  _| || |");
	Print(5, " |_|\\_\\\\___/|_|\\_|\\___|  \\___\\___/_|_|_|_|_|_\\_,_|_||_|_|\\__|\\_, |");
	Print(5, "                                                             |__/ ");
	Print(5, "==================================================================");
	Print(5, "=== KUNG Community, Course parsing system for timetable module ===");
	Print(5, "==================================================================");
}
