export interface Notes {
    note?: Notes
    id: string
    noteTitle: string
    noteBody?: string
    createdAt: Date
    pinned: boolean
    bgColor?: string
    bgImage?: string
    archived: boolean
    trashed: boolean
    hover: boolean
}