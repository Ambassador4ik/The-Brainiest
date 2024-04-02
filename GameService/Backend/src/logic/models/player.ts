import {WSContext} from "../../common/wsConfig";

class Player {
    public userId: number;
    public connection: WSContext;

    public points: number;

    constructor(userId: number, connection: WSContext) {
        this.userId = userId;
        this.connection = connection;

        this.points = 0;
    }
}

export default Player;