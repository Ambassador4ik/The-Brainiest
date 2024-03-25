import IGameModeRules from "./GameModeRules/IGameModeRules.ts";

interface IGameMode {
    RoomOptions: any;
    ActiveRooms: any;
    Rules: IGameModeRules;
}

export default IGameMode