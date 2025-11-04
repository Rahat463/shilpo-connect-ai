export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      document_embeddings: {
        Row: {
          content: string
          created_at: string
          document_type: string
          embedding: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          document_type: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          document_type?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      feedbacks: {
        Row: {
          category: string | null
          comments: string
          created_at: string | null
          feedback_type: string
          from_user_id: string
          id: string
          rating: number | null
          to_user_id: string
        }
        Insert: {
          category?: string | null
          comments: string
          created_at?: string | null
          feedback_type: string
          from_user_id: string
          id?: string
          rating?: number | null
          to_user_id: string
        }
        Update: {
          category?: string | null
          comments?: string
          created_at?: string | null
          feedback_type?: string
          from_user_id?: string
          id?: string
          rating?: number | null
          to_user_id?: string
        }
        Relationships: []
      }
      job_posts: {
        Row: {
          created_at: string
          description: string
          employment_type: string | null
          factory_id: string
          id: string
          location: string | null
          requirements: Json | null
          salary_range: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          employment_type?: string | null
          factory_id: string
          id?: string
          location?: string | null
          requirements?: Json | null
          salary_range?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          employment_type?: string | null
          factory_id?: string
          id?: string
          location?: string | null
          requirements?: Json | null
          salary_range?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_posts_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      manager_workers: {
        Row: {
          assigned_at: string | null
          id: string
          manager_id: string
          worker_id: string
        }
        Insert: {
          assigned_at?: string | null
          id?: string
          manager_id: string
          worker_id: string
        }
        Update: {
          assigned_at?: string | null
          id?: string
          manager_id?: string
          worker_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string
          id: string
          read: boolean | null
          receiver_id: string
          sender_id: string
          subject: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id: string
          sender_id: string
          subject?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string
          sender_id?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monitoring_logs: {
        Row: {
          activity_type: string
          description: string | null
          id: string
          location: string | null
          logged_at: string | null
          status: string | null
          worker_id: string
        }
        Insert: {
          activity_type: string
          description?: string | null
          id?: string
          location?: string | null
          logged_at?: string | null
          status?: string | null
          worker_id: string
        }
        Update: {
          activity_type?: string
          description?: string | null
          id?: string
          location?: string | null
          logged_at?: string | null
          status?: string | null
          worker_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          availability: string | null
          certifications: Json | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          education: string | null
          email: string | null
          factory_id: string | null
          full_name: string
          id: string
          national_id: string | null
          phone: string | null
          position: string | null
          preferred_salary_max: number | null
          preferred_salary_min: number | null
          profile_visibility: string | null
          skills: string[] | null
          updated_at: string | null
          work_history: Json | null
        }
        Insert: {
          address?: string | null
          availability?: string | null
          certifications?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          education?: string | null
          email?: string | null
          factory_id?: string | null
          full_name: string
          id: string
          national_id?: string | null
          phone?: string | null
          position?: string | null
          preferred_salary_max?: number | null
          preferred_salary_min?: number | null
          profile_visibility?: string | null
          skills?: string[] | null
          updated_at?: string | null
          work_history?: Json | null
        }
        Update: {
          address?: string | null
          availability?: string | null
          certifications?: Json | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          education?: string | null
          email?: string | null
          factory_id?: string | null
          full_name?: string
          id?: string
          national_id?: string | null
          phone?: string | null
          position?: string | null
          preferred_salary_max?: number | null
          preferred_salary_min?: number | null
          profile_visibility?: string | null
          skills?: string[] | null
          updated_at?: string | null
          work_history?: Json | null
        }
        Relationships: []
      }
      quality_assessments: {
        Row: {
          assessed_by: string
          comments: string | null
          created_at: string | null
          date: string
          efficiency_score: number | null
          id: string
          quality_score: number | null
          work_completed: number | null
          worker_id: string
        }
        Insert: {
          assessed_by: string
          comments?: string | null
          created_at?: string | null
          date?: string
          efficiency_score?: number | null
          id?: string
          quality_score?: number | null
          work_completed?: number | null
          worker_id: string
        }
        Update: {
          assessed_by?: string
          comments?: string | null
          created_at?: string | null
          date?: string
          efficiency_score?: number | null
          id?: string
          quality_score?: number | null
          work_completed?: number | null
          worker_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_call_sessions: {
        Row: {
          created_at: string
          ended_at: string | null
          factory_id: string
          id: string
          room_id: string
          scheduled_at: string | null
          started_at: string | null
          status: string | null
          worker_id: string
        }
        Insert: {
          created_at?: string
          ended_at?: string | null
          factory_id: string
          id?: string
          room_id: string
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
          worker_id: string
        }
        Update: {
          created_at?: string
          ended_at?: string | null
          factory_id?: string
          id?: string
          room_id?: string
          scheduled_at?: string | null
          started_at?: string | null
          status?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "video_call_sessions_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_call_sessions_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_references: {
        Row: {
          created_at: string
          factory_id: string
          id: string
          rating: number | null
          reference_text: string
          verified: boolean | null
          worker_id: string
        }
        Insert: {
          created_at?: string
          factory_id: string
          id?: string
          rating?: number | null
          reference_text: string
          verified?: boolean | null
          worker_id: string
        }
        Update: {
          created_at?: string
          factory_id?: string
          id?: string
          rating?: number | null
          reference_text?: string
          verified?: boolean | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_references_factory_id_fkey"
            columns: ["factory_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_references_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "factory_admin" | "manager" | "worker"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["factory_admin", "manager", "worker"],
    },
  },
} as const
