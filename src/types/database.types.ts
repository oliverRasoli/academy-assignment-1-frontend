export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Dogs: {
        Row: {
          description: string
          id: number
          race_name: string
          uuid: string
        }
        Insert: {
          description: string
          id?: number
          race_name: string
          uuid: string
        }
        Update: {
          description?: string
          id?: number
          race_name?: string
          uuid?: string
        }
      }
      Profiles: {
        Row: {
          created_at: string | null
          id: number
          password: string
          username: string
          uuid: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          password: string
          username: string
          uuid: string
        }
        Update: {
          created_at?: string | null
          id?: number
          password?: string
          username?: string
          uuid?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
