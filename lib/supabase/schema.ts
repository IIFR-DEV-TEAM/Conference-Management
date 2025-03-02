export type Conference = {
    id: string
    title: string
    description: string
    start_date: string
    location: string
    image_url: string
    link: string
    organizer_id: string
    attendees: string[]
    user_status: "admin" | "superadmin" | "author" | "reviewer"
    created_at: string
  }
  
  export const createConferencesTable = async (supabase: any) => {
    const { error } = await supabase.rpc("create_conferences_table", {
      table_name: "conferences",
      columns: `
        id uuid default uuid_generate_v4() primary key,
        title text not null,
        description text,
        start_date date not null,
        location text,
        image_url text,
        link text,
        organizer_id uuid references auth.users(id),
        attendees uuid[] default '{}',
        user_status text check (user_status in ('admin', 'superadmin', 'author', 'reviewer')),
        created_at timestamp with time zone default timezone('utc'::text, now())
      `,
    })
  
    if (error) {
      console.error("Error creating conferences table:", error)
      throw error
    }
  }
  
  