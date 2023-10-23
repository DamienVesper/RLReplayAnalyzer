import { escapeQuotes } from '../utils/standardize';

export interface Player {
    name: string
    stats: Record<`score` | `goals` | `assists` | `saves` | `shots`, number>
}

export interface Team {
    name: string
    players: Record<string, Player>
}

export interface Data {
    name: string
    date: string

    map: string

    teams: Record<`orange` | `blue`, Team>
}

export class Replay implements Data {
    private readonly id: number;

    private readonly replayFile: string;
    private readonly jsonFile: string;

    name: string;
    map: string;

    date: string;
    teams: Record<string, Team>;

    constructor (id: number, replayFile: string, jsonFile: string) {
        this.id = id;

        this.replayFile = replayFile;
        this.jsonFile = jsonFile;
    }

    /**
     * Initialize the replay object with data.
     * @param data The data to initialize with.
     */
    initialize = (data: Data): void => {
        this.name = data.name;
        this.map = data.map;

        this.date = data.date;
        this.teams = data.teams;
    };

    /**
     * Calculate game stats.
     * @note Change this to be saved in class data instead of calculating twice and wasting time.
     */
    calculateStats = (): { matchFormat: string, teamStats: Array<Player[`stats`]>, winningTeam: number } => {
        const players = [
            [`""`, `""`, `""`, `""`],
            [`""`, `""`, `""`, `""`]
        ];

        for (const i in this.teams) for (const j in this.teams[i].players) players[i][j] = this.teams[i].players[j].name;
        const matchFormat = `${players[0].filter(x => x !== `""`).length}v${players[1].filter(x => x !== `""`).length}`;

        const teamStats: Array<Player[`stats`]> = [];
        for (const i in this.teams) {
            teamStats[i] = {
                goals: Object.values(this.teams[i].players).map(x => x.stats.goals).reduce((a, b) => a + b),
                assists: Object.values(this.teams[i].players).map(x => x.stats.assists).reduce((a, b) => a + b),
                saves: Object.values(this.teams[i].players).map(x => x.stats.saves).reduce((a, b) => a + b),
                shots: Object.values(this.teams[i].players).map(x => x.stats.shots).reduce((a, b) => a + b)
            };
        }

        const winningTeam = teamStats[0].goals > teamStats[1].goals ? 0 : 1;
        return {
            matchFormat,
            teamStats,
            winningTeam
        };
    };

    /**
     * Export the replay data to a CSV string.
     */
    exportTeamData = (): string => {
        const { matchFormat, teamStats, winningTeam } = this.calculateStats();
        return [
            escapeQuotes(this.name),
            escapeQuotes(this.teams.blue.name),
            escapeQuotes(this.teams.orange.name),
            matchFormat,
            `${teamStats[0].goals}-${teamStats[1].goals}`,
            escapeQuotes(this.teams[winningTeam].name),
            ``,
            `${teamStats.map(x => x.goals).reduce((a, b) => a + b)}`,
            `${teamStats.map(x => x.assists).reduce((a, b) => a + b)}`,
            `${teamStats.map(x => x.saves).reduce((a, b) => a + b)}`,
            `${teamStats.map(x => x.shots).reduce((a, b) => a + b)}`
        ].map(x => `"${x}"`).join(`,`);
    };

    exportPlayerData = (): string[] => {
        const res: string[] = [];
        Object.values(this.teams).forEach((team, i) => {
            for (const player of Object.values(team.players)) {
                const { matchFormat, teamStats, winningTeam } = this.calculateStats();
                res.push([
                    escapeQuotes(player.name),
                    escapeQuotes(team.name),
                    matchFormat,
                    winningTeam === i ? `Won` : `Lost`,
                    `${teamStats[i].goals}-${teamStats[Math.abs(i - 1)].goals}`,
                    ``,
                    `${player.stats.goals}`,
                    `${player.stats.assists}`,
                    `${player.stats.saves}`,
                    `${player.stats.shots}`,
                    ``,
                    `${(player.stats.goals / player.stats.shots).toFixed(2)}`,
                    `${(player.stats.assists / player.stats.goals).toFixed(2)}`,
                    `${(player.stats.saves / player.stats.goals).toFixed(2)}`,
                    ``,
                    `${(player.stats.goals / teamStats[i].goals).toFixed(2)}`,
                    `${(player.stats.assists / teamStats[i].goals).toFixed(2)}`,
                    `${(player.stats.saves / teamStats[i].goals).toFixed(2)}`,
                    `${(player.stats.shots / teamStats[i].goals).toFixed(2)}`
                ].map(x => `"${x}"`).join(`,`));
            }
        });

        return res;
    };
}
