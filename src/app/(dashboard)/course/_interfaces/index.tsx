import { UploadFile } from "antd"

export interface ICourse {
  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  slug?: string
  name: string
  description?: string
  position: number
  category: string
  is_active: boolean
  image_introduce_url?: string
  video_introduce_url?: string
  time: number
  imgUrl: UploadFile[]
  videoUrl: UploadFile[]
  lessons?: any[]
  chapters?: IChapter[]
  enroll_users?: IEnrollCourse[]
}

export interface IEnrollCourse {
  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  user_id: string
  course_id: string
  is_completed: boolean
}

export interface IChapter {
  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  slug?: string
  name: string
  description?: string
  lessons?: ILesson[]
  course?: ICourse
  position: number
  course_id?: string
}


export interface ILesson {
  id?: string
  created_at?: Date
  updated_at?: Date
  deleted_at?: Date
  slug?: string
  name: string
  thumbnail_url?: string
  youtube_id: string
  gdrive_id?: string
  description?: string
  position: number
  time: number
  is_active: boolean
  have_to_finish_before: boolean
  chapter_id?: string
  course_id?: string
  imgUrl: UploadFile[]
  chapter?: IChapter
  lesson_history?: ILessonHistory[]
}

export interface ILessonHistory {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: Date
  is_completed: boolean
  lesson_id: string
  user_id: string
  lesson : ILesson
}
