export interface Attachment {
    id: string
    name: string
    url: string
    courseId: string
    createdAt: string
    updatedAt: string
}

export interface Category {
    id: string
    name: string
}

export interface Chapter {
    id: string
    title: string
    description: string
    videoUrl: string
    position: number
    isPublished: boolean
    isFree: boolean
    courseId: string
    createdAt: string
    updatedAt: string
    muxDataId: string
}

export interface Course {
    id: string
    userId: string
    title: string
    description?: string
    imageUrl?: string
    price?: number
    isPublished: boolean
    categoryId?: string
    createdAt: string
    updatedAt: string
    attachments: Attachment[]
    category: Category[]
    chapters: any[]
}
