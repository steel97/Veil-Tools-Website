export interface Networks {
    timestamp: number;
    networks: Record<string, Network>;
}

export interface Network {
    icon: string;
    name: string;
    mirrors: Array<Mirror>;
}

export interface Mirror {
    name: string;
    path: string;
    snapshots: Array<Snapshot>
}

export interface Snapshot {
    name: string;
    sha256: string;
    block: string;
    date: string;
}